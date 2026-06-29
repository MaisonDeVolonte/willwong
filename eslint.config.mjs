/**
 * ========================================================================================
 * @file eslint.config.mjs - global eslint configuration and project linting rules
 * ========================================================================================
 * @description
 * - defines project-wide ignores for generated or external code (e.g. webflow, .wrangler)
 * - enforces mandatory jsdoc wayfinding headers on all executable files
 * @see /AGENTS.md/, /package.json/
 */

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import jsdoc from "eslint-plugin-jsdoc";

// mandatory node.js system variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname, });

const eslintConfig = [
  // global ignores
  {
    ignores: [
      "webflow/**",
      "content/**",
      "**/*.generated.ts",
      ".next/**",
      ".open-next/**",
      ".wrangler/**",
      "cloudflare-env.d.ts",
      "next-env.d.ts",
    ],
  },

  // baseline presets
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // project-wide overrides
  {
    plugins: {
      jsdoc: jsdoc,
    },
    rules: {
      "jsdoc/require-file-overview": "warn",
    },
  },

  // per-area overrides
  {
    files: [""],
    rules: {},
  },
];

export default eslintConfig;
