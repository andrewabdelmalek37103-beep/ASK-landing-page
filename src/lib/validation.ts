import { z } from "zod";

/**
 * Shared schema for the optional "send me this recommendation" lead capture form.
 * Used for both client-side and server-side validation so the two never drift apart.
 */
export const leadSchema = z.object({
  firstName: z.string().trim().min(1, "Enter your first name.").max(80),
  email: z.string().trim().email("Enter a valid business email."),
  storeUrl: z.string().trim().min(1, "Enter your store or business website.").max(200),
  assessmentResult: z.string().trim().max(120).optional().default(""),
  primaryChallenge: z.string().trim().max(200).optional().default(""),
  consent: z.literal(true, {
    error: "Please confirm you agree to be contacted about this request.",
  }),
  // Honeypot: real visitors never fill this hidden field.
  companyWebsite: z.string().max(0, "Spam check failed.").optional().default(""),
  page: z.string().trim().max(300).optional().default(""),
  referrer: z.string().trim().max(300).optional().default(""),
  utm: z
    .object({
      source: z.string().trim().max(120).optional(),
      medium: z.string().trim().max(120).optional(),
      campaign: z.string().trim().max(120).optional(),
      term: z.string().trim().max(120).optional(),
      content: z.string().trim().max(120).optional(),
    })
    .optional()
    .default({}),
});

export type LeadInput = z.infer<typeof leadSchema>;
