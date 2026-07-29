/**
 * ========================================================================================
 * @file mirrors.test.ts - unit tests for hybrid @mirror resolution
 * ========================================================================================
 * @description
 * - covers the routing decision: in-repo targets hit the bundle, operator targets do not
 * - asserts an unreachable operator target degrades to a placeholder rather than throwing
 * - runs under vitest (`npm run test:unit`); the operator fetch is stubbed, never real
 * @see src/cms/mirrors.ts, src/cms/directives.ts, vitest.config.ts
 */

import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { isOperatorTarget, resolveMirror, toOperatorPath } from "@/cms/mirrors";

describe("toOperatorPath", () => {
  test("maps the scaffold entry point onto operator's README", () => {
    // operator has no AGENTS.md; willwong's symlink renames README.md to it
    expect(toOperatorPath("AGENTS.md")).toBe("README.md");
  });

  test("leaves every other target untouched", () => {
    expect(toOperatorPath("AGENTS/hooks/stop.sh")).toBe("AGENTS/hooks/stop.sh");
    expect(toOperatorPath("AGENTS/templates/logs.md")).toBe("AGENTS/templates/logs.md");
  });
});

describe("isOperatorTarget", () => {
  test("matches the agent scaffold and nothing else", () => {
    expect(isOperatorTarget("AGENTS.md")).toBe(true);
    expect(isOperatorTarget("AGENTS/git/gitdeliver.sh")).toBe(true);
    expect(isOperatorTarget("src/app/page.tsx")).toBe(false);
    expect(isOperatorTarget(".github/workflows/ci.yml")).toBe(false);
  });

  test("does not match content/AGENTS, which holds the pointers themselves", () => {
    expect(isOperatorTarget("content/AGENTS/git.md")).toBe(false);
  });
});

describe("resolveMirror", () => {
  test("returns content unchanged when there is no @mirror directive", async () => {
    const content = "export const answer = 42;";
    await expect(resolveMirror(content)).resolves.toBe(content);
  });

  test("falls back to the original content when an in-repo target is unknown", async () => {
    const content = "// @mirror does/not/exist.ts";
    await expect(resolveMirror(content)).resolves.toBe(content);
  });
});

describe("resolveMirror, operator targets", () => {
  const originalSource = process.env.CONTENT_SOURCE;

  beforeEach(() => {
    // force the github branch, so the disk symlink can't mask a fetch failure
    process.env.CONTENT_SOURCE = "github";
  });

  afterEach(() => {
    process.env.CONTENT_SOURCE = originalSource;
    vi.unstubAllGlobals();
  });

  test("degrades to a placeholder when operator is unreachable", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("nope", { status: 404 })),
    );
    const result = await resolveMirror("# @mirror AGENTS/hooks/stop.sh");
    expect(result).toBe("// @mirror target not found: AGENTS/hooks/stop.sh");
  });

  test("never consults the build bundle for an operator target", async () => {
    // AGENTS.md is absent from the bundle by design; a bundle lookup would return
    // the pointer unchanged, so a placeholder proves the operator path was taken
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("nope", { status: 500 })),
    );
    const result = await resolveMirror("// @mirror AGENTS.md");
    expect(result).toBe("// @mirror target not found: AGENTS.md");
  });
});
