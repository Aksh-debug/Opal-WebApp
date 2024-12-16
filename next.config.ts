import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    eslint: {
      ignoreDuringBuilds: true, // Disables linting on build
    }
};

export default nextConfig;
