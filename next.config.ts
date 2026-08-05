import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root explicitly: an unrelated lockfile in a parent
  // directory (C:\Users\andre\package-lock.json) otherwise makes Next.js
  // guess the wrong root and warn on every build.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
