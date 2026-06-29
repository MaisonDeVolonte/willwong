/**
 * ========================================================================================
 * @file version.ts - exposes git versioning constants to the frontend
 * ========================================================================================
 * @description
 * - imports the generated build-time script data and formats it into ui-ready strings
 * - allows footer to display the active commit hash without fs access
 * @see /scripts/version.mjs/
 */

import pkg from "@/../package.json";
import { COMMIT_HASH, COMMIT_COUNT } from "@/meta/config/version.generated";

const repo = "https://github.com/MaisonDeVolonte/willwong";

// Use major/minor from package.json and total commit count for patch
const [major, minor] = pkg.version.split(".");
export const versionText = `v${major}.${minor}.${COMMIT_COUNT}`;
export const versionLink = { href: `${repo}/releases`, target: "_blank" as const };

export const hashText = COMMIT_HASH;
export const hashLink = { href: `${repo}/commit/${COMMIT_HASH}`, target: "_blank" as const };
