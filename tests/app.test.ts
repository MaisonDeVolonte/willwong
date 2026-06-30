/**
 * =======================================================
 * @file app.test.ts - playwright end-to-end testing suite
 * =======================================================
 * @description
 * - tests cover layout, canvas, nav, tabs, panels, etc
 * - runs in gitHub actions CI: `tsc`, `eslint`, `build` → `npm run test:e2e`
 * - can be run locally or with `:ui` for visual debugging
 * - CI runs tests against build server (local boots dev server)
 * - CI executes tests sequentially (local executes in parallel)
 * - CI retries tests twice before marking a test as failed (local does not retry)
 * - CI automatically records a full trace (DOM, network, console, etc) during first retry
 * - notes:
 *   - `test.only` causes pipeline failures in CI
 *   - test.describe(): groups tests into related concepts (e.g. layout)
 *   - test(): defines a self-contained test case (e.g. initialization)
 *   - beforeEach(): runs before each test case (e.g. setup)
 *   - toBeVisible(): checks dom node, display:none, visibility:hidden, opacity:0, width/height:0, etc
 *   - toHaveCSS(): checks specific properties such as display, color, etc
 *   - toHaveScreenshot(): captures a screenshot and compares against provided baseline image
 * @see /playwright.config.ts, /.github/workflows/ci.yml, /tests/report/index.html, /tests/results/.last-run.json
 */

import { test, expect } from '@playwright/test';

test.describe('layout', () => {
  test('initialization', async ({ page, isMobile }) => {
    await page.goto('/');
    const components = [
      '.shell',
        '.header',
        '.stage',
          '.canvas',
        '.footer',

      ...(isMobile ? [] : [
        '.chat',
        '.nav',
      ]),
    ];
    for (const selector of components) { await expect(page.locator(selector)).toBeVisible(); }
  });
});
