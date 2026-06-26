import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";

// Enable getCloudflareContext() in `next dev`
initOpenNextCloudflareForDev();

const basePath = process.env.BASE_URL || "";
const nextConfig: NextConfig = {
  ...(basePath && {
    basePath,
    assetPrefix: process.env.ASSETS_PREFIX || basePath,
  }),
  webpack(config) {
    config.module.rules.push({ test: /\.md$/, type: "asset/source" });
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true, // lint runs as a dedicated CI gate, not during build
  },
};

export default nextConfig;
