/**
 * ========================================================================================
 * @file githubFetch.test.ts - unit tests for the shared GitHub fetch/header helpers
 * ========================================================================================
 * @description
 * - covers githubFetch's retry/backoff: succeeds immediately, retries transient failures,
 *   gives up after 3 attempts (mirrors the private MAX_ATTEMPTS), and never retries a non-429 4xx
 * - covers githubHeaders: base headers, per-agent User-Agent, and the optional token branch
 * - mocks global fetch and @/utilities/githubToken; no real network calls, no fake timers
 *   (real 250/500ms backoff delays are cheap enough to just let run)
 * @see /src/apis/githubFetch.ts/, /vitest.config.ts/
 */

import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { REPO_NAME } from "@/utilities/githubRepo";

vi.mock("@/utilities/githubToken", () => ({
  getGithubToken: vi.fn(),
}));

import { getGithubToken } from "@/utilities/githubToken";
import { githubFetch, githubHeaders } from "@/apis/githubFetch";

function mockResponse(status: number, statusText = ""): Response {
  return { ok: status >= 200 && status < 300, status, statusText } as unknown as Response;
}

describe("githubFetch", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test("returns the response on the first successful attempt", async () => {
    fetchMock.mockResolvedValueOnce(mockResponse(200));

    const res = await githubFetch("https://api.github.com/x", {});

    expect(res.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  test("does not retry a non-429 4xx response", async () => {
    fetchMock.mockResolvedValueOnce(mockResponse(404, "Not Found"));

    const res = await githubFetch("https://api.github.com/x", {});

    expect(res.status).toBe(404);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  test("retries a 429 and returns the eventual success", async () => {
    fetchMock
      .mockResolvedValueOnce(mockResponse(429, "Too Many Requests"))
      .mockResolvedValueOnce(mockResponse(200));

    const res = await githubFetch("https://api.github.com/x", {});

    expect(res.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  test("retries a 5xx and returns the eventual success", async () => {
    fetchMock
      .mockResolvedValueOnce(mockResponse(503, "Service Unavailable"))
      .mockResolvedValueOnce(mockResponse(200));

    const res = await githubFetch("https://api.github.com/x", {});

    expect(res.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  test("retries a network error and returns the eventual success", async () => {
    fetchMock.mockRejectedValueOnce(new Error("network down")).mockResolvedValueOnce(mockResponse(200));

    const res = await githubFetch("https://api.github.com/x", {});

    expect(res.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  test("gives up after 3 attempts and throws the last error", async () => {
    fetchMock
      .mockResolvedValueOnce(mockResponse(500, "Internal Server Error"))
      .mockResolvedValueOnce(mockResponse(500, "Internal Server Error"))
      .mockResolvedValueOnce(mockResponse(500, "Internal Server Error"));

    await expect(githubFetch("https://api.github.com/x", {})).rejects.toThrow(
      "500 Internal Server Error",
    );
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });
});

describe("githubHeaders", () => {
  const getGithubTokenMock = vi.mocked(getGithubToken);

  afterEach(() => {
    getGithubTokenMock.mockReset();
  });

  test("builds Accept and a per-agent User-Agent with no Authorization when there is no token", async () => {
    getGithubTokenMock.mockResolvedValueOnce(undefined);

    const headers = await githubHeaders("tree");

    expect(headers).toEqual({
      Accept: "application/vnd.github+json",
      "User-Agent": `${REPO_NAME}-tree`,
    });
  });

  test("includes a Bearer Authorization header when a token is present", async () => {
    getGithubTokenMock.mockResolvedValueOnce("secret-token");

    const headers = await githubHeaders("repo");

    expect(headers).toEqual({
      Accept: "application/vnd.github+json",
      "User-Agent": `${REPO_NAME}-repo`,
      Authorization: "Bearer secret-token",
    });
  });

  test("tags the cms agent distinctly from tree/repo", async () => {
    getGithubTokenMock.mockResolvedValueOnce(undefined);

    const headers = await githubHeaders("cms");

    expect(headers["User-Agent"]).toBe(`${REPO_NAME}-cms`);
  });
});
