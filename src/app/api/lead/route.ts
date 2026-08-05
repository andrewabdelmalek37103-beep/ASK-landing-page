import { NextRequest, NextResponse } from "next/server";
import { leadSchema } from "@/lib/validation";
import { isRateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";

function jsonError(message: string, status: number) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

export async function POST(request: NextRequest) {
  const identifier =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(identifier)) {
    return jsonError("Too many requests. Please try again shortly.", 429);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid request body.", 400);
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(
      parsed.error.issues[0]?.message || "Please check the form and try again.",
      400
    );
  }

  // Honeypot: a filled hidden field means this was almost certainly a bot.
  // Respond with success so the bot doesn't learn anything, but never forward it.
  if (parsed.data.companyWebsite) {
    return NextResponse.json({ ok: true });
  }

  const validated = parsed.data;

  const payload = {
    firstName: validated.firstName,
    email: validated.email,
    storeUrl: validated.storeUrl,
    assessmentResult: validated.assessmentResult,
    primaryChallenge: validated.primaryChallenge,
    consent: true,
    consentTimestamp: new Date().toISOString(),
    utm: validated.utm,
    page: validated.page,
    referrer: validated.referrer,
  };

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  if (!webhookUrl) {
    // Graceful local-development fallback: no destination configured, so we
    // log locally instead of failing the request or silently dropping data.
    if (process.env.NODE_ENV !== "production") {
      console.log("[lead] LEAD_WEBHOOK_URL not set — payload not forwarded:", {
        ...payload,
        email: "[redacted-in-log]",
      });
    }
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Webhook responded with status ${response.status}`);
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[lead] webhook delivery failed:", error);
    }
    return jsonError("We couldn't send this right now. Please try again in a moment.", 502);
  }
}
