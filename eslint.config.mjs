import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Global ignores: generated output + raw content (off-limits per AGENTS.md)
  { ignores: ["webflow/**", "content/**", "**/*.generated.ts", ".next/**", ".open-next/**", "cloudflare-env.d.ts", "next-env.d.ts"] },

  // Baseline presets
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Project-wide overrides
  {
    rules: {
      // "@next/next/no-img-element": "off",      // you use <img> on purpose
      // "react/no-unescaped-entities": "off",    // you like literal apostrophes
      // "react-hooks/exhaustive-deps": "error",  // promote one rule you care about
    },
  },

  // Per-area overrides
  {
    files: ["scripts/**/*.{js,mjs}"],
    rules: {
      // e.g. if you ever enable no-console globally, exempt build scripts here
    },
  },
];

export default eslintConfig;
