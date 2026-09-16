import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Build වෙද්දී TypeScript Errors නිසා Build එක Fail වීම නවත්වයි
    ignoreBuildErrors: true,
  },
  eslint: {
    // Build වෙද්දී ESLint Warnings/Errors Ignore කරයි
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;