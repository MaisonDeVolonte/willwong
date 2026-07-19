/**
 * ========================================================================================
 * @file vitest.config.ts - vitest unit testing configuration
 * ========================================================================================
 * @description
 * - scopes unit tests to co-located `src/**` specs so playwright keeps sole ownership of `/tests/`
 * - resolves the `@/` and `@webflow/` path aliases so tests import modules exactly like the app does
 * - runs in a plain node environment; unit targets are pure functions with no dom or next runtime
 * @see /package.json/, /tsconfig.json/, /src/cms/directives.test.ts/
 */

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// mandatory node.js system variables (mirrors eslint.config.mjs)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  // mirror the tsconfig `paths` so `@/` and `@webflow/` resolve the same way here as in the app.
  // regex anchors avoid `@webflow/` accidentally matching the shorter `@/` rule.
  resolve: {
    alias: [
      { find: /^@webflow\//, replacement: resolve(__dirname, "webflow") + "/" },
      { find: /^@\//, replacement: resolve(__dirname, "src") + "/" },
    ],
  },
  test: {
    include: ["src/**/*.test.ts"],
    environment: "node",
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/**/*.test.ts", "**/*.generated.ts"],
      all: true,
    },
  },
});
