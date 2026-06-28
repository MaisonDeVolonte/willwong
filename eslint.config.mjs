import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

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
      "cloudflare-env.d.ts",
      "next-env.d.ts",
    ],
  },

  // baseline presets
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // project-wide overrides
  { rules: {}, },

  // per-area overrides
  {
    files: [""],
    rules: {},
  },
];

export default eslintConfig;
