/**
 * =======================================================
 * @file app.test.ts - playwright end-to-end testing suite
 * =======================================================
 * @description
 * - tests cover layout, canvas, nav, tabs, panels, etc
 * - runs in gitHub actions CI: `tsc`, `eslint`, `build` → `npm run test:e2e`
 * - can be run locally or with `:ui` for visual debugging
 * - CI runs tests against build server (local boots dev server)
 * - CI retries a failed test once before marking it failed (local does not retry)
 * - CI automatically records a full trace (DOM, network, console, etc) during first retry
 * - tests execute sequentially in both ci and local (workers: 1)
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
    let components = [
      '#Shell',
      '#Header',
      '#Stage',
      '#NavPanel',
      '#Canvas',
      '#ChatPanel',
      '#Footer',
    ];
    if (isMobile) {components = [
      '#Shell',
      '#Header',
      '#Stage',
      '#Canvas',
      '#Footer',
    ];}

    await page.goto('/');
    for (const selector of components) { await expect(page.locator(selector)).toBeVisible(); }
  });
});

test.describe('Header', () => {
  test('initialization', async ({ page, isMobile }) => {
    let elements = [
      '#NavTrigger',
      '#NavRoot',
    ];
    if (isMobile) {elements = [
      '#NavTrigger',
      '#NavRoot',
    ];}

    await page.goto('/');
    for (const selector of elements) { await expect(page.locator(selector)).toBeVisible(); }
  });

  test('NavTrigger', async ({ page, isMobile }) => {
    const navTrigger = page.locator('#NavTrigger');
    const nav = page.locator('#NavPanel');

    await page.goto('/');
    if (!isMobile) {
      await navTrigger.click();
      await expect(nav).not.toBeVisible();
      await navTrigger.click();
      await expect(nav).toBeVisible();
    } else {
      await navTrigger.click();
      await expect(nav).toBeVisible();
      await navTrigger.click();
      await expect(nav).not.toBeVisible();
    }
  });

  test('NavRoot', async ({ page }) => {
    const navRoot = page.locator('#NavRoot');

    await page.goto('/about');
    await expect(navRoot).toHaveAttribute('href', '/');
    await expect(navRoot).not.toHaveClass(/nav__root--active/);

    await navRoot.click();
    await expect(page).toHaveURL(/.*\/$/);
    await expect(navRoot).toHaveClass(/nav__root--active/);
  });
});

test.describe('Footer', () => {
  test('VersionInfo', async ({ page, context }) => {
    const versionInfo = page.locator('#VersionInfo');
    const versionLink = page.locator('#VersionNumber');
    const commitLink = page.locator('#CommitHash');

    await page.goto('/');

    await expect(versionInfo).toBeVisible();

    await expect(versionLink).toHaveText(/^v\d+\.\d+\.\d+$/);
    await expect(versionLink).toHaveAttribute('href', /github\.com.*\/releases/);
    await expect(versionLink).toHaveAttribute('target', '_blank');
    const [versionLinkDestination] = await Promise.all([
      context.waitForEvent('page'),
      versionLink.click(),
    ]);
    await expect(versionLinkDestination).toHaveURL(/github\.com.*\/releases/);
    await versionLinkDestination.close();

    await expect(commitLink).toHaveText(/^[a-f0-9]{7}$/);
    await expect(commitLink).toHaveAttribute('href', /github\.com.*\/commit\/[a-f0-9]{7}/);
    await expect(commitLink).toHaveAttribute('target', '_blank');
    const [commitLinkDestination] = await Promise.all([
      context.waitForEvent('page'),
      commitLink.click(),
    ]);
    await expect(commitLinkDestination).toHaveURL(/github\.com.*\/commit\/[a-f0-9]{7}/);
    await commitLinkDestination.close();
  });
});
