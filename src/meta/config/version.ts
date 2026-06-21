import pkg from "@/../package.json";
import { COMMIT_HASH } from "@/meta/config/version.generated";

const repo = "https://github.com/MaisonDeVolonte/willwong";

export const versionText = `v${pkg.version}`;
export const versionLink = { href: `${repo}/releases` };

export const hashText = COMMIT_HASH;
export const hashLink = { href: `${repo}/commit/${COMMIT_HASH}` };
