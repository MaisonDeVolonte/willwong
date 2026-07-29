/**
 * ========================================================================================
 * @file directives.test.ts - unit tests for the content directive parsers
 * ========================================================================================
 * @description
 * - covers the pure parsers in directives.ts: parseMetadata, processExternal, parseMirrorTarget
 * - asserts directive detection across bare, `//`, `/* *\/`, `<!-- -->`, and `#` comment styles
 * - runs under vitest (`npm run test:unit`); no dom, network, or next runtime required
 * @see src/cms/directives.ts, vitest.config.ts
 */

import { describe, test, expect } from "vitest";
import { parseMetadata, processExternal, processMirror, parseMirrorTarget } from "@/cms/directives";

describe("parseMetadata", () => {
  test("reads a bare @title and @description", () => {
    const content = "@title Hello World\n@description A short summary";
    expect(parseMetadata(content)).toEqual({
      title: "Hello World",
      description: "A short summary",
    });
  });

  test("reads a directive written inside a line comment", () => {
    expect(parseMetadata("// @title Commented Title").title).toBe("Commented Title");
  });

  test("strips block and html comment closers from the value", () => {
    // the value captures up to the newline, so the trailing `*/` and `-->` must be trimmed off
    expect(parseMetadata("/* @title Boxed */").title).toBe("Boxed");
    expect(parseMetadata("<!-- @description Doc text -->").description).toBe("Doc text");
  });

  test("returns undefined fields when no directives are present", () => {
    expect(parseMetadata("just some ordinary content")).toEqual({
      title: undefined,
      description: undefined,
    });
  });
});

describe("processExternal", () => {
  test("returns the url for an @external directive", () => {
    expect(processExternal("@external https://willwong.me")).toEqual({
      externalUrl: "https://willwong.me",
      iconName: undefined,
    });
  });

  test("includes an @icon override when one is present", () => {
    const content = "@external https://github.com\n@icon github";
    expect(processExternal(content)).toEqual({
      externalUrl: "https://github.com",
      iconName: "github",
    });
  });

  test("returns an empty object when there is no @external directive", () => {
    expect(processExternal("no directives here")).toEqual({});
  });
});

describe("processMirror", () => {
  test("returns the content unchanged when there is no @mirror directive", () => {
    const content = "export const answer = 42;";
    expect(processMirror(content)).toBe(content);
  });

  test("ignores a bare @mirror that is not inside a comment", () => {
    // @mirror must lead a real comment; a bare directive is treated as ordinary content
    const content = "@mirror src/app/layout.tsx";
    expect(processMirror(content)).toBe(content);
  });

  test("falls back to the original content when the mirror target is unknown", () => {
    const content = "// @mirror does/not/exist.ts";
    expect(processMirror(content)).toBe(content);
  });
});

describe("parseMirrorTarget", () => {
  test("reads the target across every comment style", () => {
    expect(parseMirrorTarget("// @mirror src/app/page.tsx")).toBe("src/app/page.tsx");
    expect(parseMirrorTarget("# @mirror AGENTS/hooks/stop.sh")).toBe("AGENTS/hooks/stop.sh");
    expect(parseMirrorTarget("/* @mirror next.config.ts */")).toBe("next.config.ts");
    expect(parseMirrorTarget("<!-- @mirror README.md -->")).toBe("README.md");
  });

  test("returns undefined when the directive is absent or not in a comment", () => {
    expect(parseMirrorTarget("export const answer = 42;")).toBeUndefined();
    expect(parseMirrorTarget("@mirror src/app/layout.tsx")).toBeUndefined();
  });
});
