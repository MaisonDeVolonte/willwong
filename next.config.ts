import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";

// mimic cloudflare in local dev environment
initOpenNextCloudflareForDev();

// dynamically handle base url
const basePath = process.env.BASE_URL || "";

const nextConfig: NextConfig = {
  // inject assetPrefix if basePath is set
  ...(basePath && {
    basePath,
    assetPrefix: process.env.ASSETS_PREFIX || basePath,
  }),

  // allow markdown files to be imported as assets
  webpack(config) {
    config.module.rules.push({ test: /\.md$/, type: "asset/source" });
    return config;
  },

  // lint runs as a dedicated CI gate, not during build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
