import { test, expect } from '@playwright/test';

test.describe('layout', () => {
  test('layout wrappers render successfully', async ({ page }) => {
    // Go to the homepage (where the layout is applied)
    await page.goto('/');

    // The layout.tsx wraps the app in a div with the class "shell"
    await expect(page.locator('.shell')).toBeVisible();

    // Check that major layout wrappers are present
    await expect(page.locator('.stage')).toBeVisible();
    await expect(page.locator('main.canvas')).toBeVisible();
  });
});

test.describe('home', () => {
  test('homepage loads and shows site info', async ({ page }) => {
    // Go to the homepage
    await page.goto('/');

    // Check that the title or header is present
    await expect(page).toHaveTitle(/William Wong/);

    // Check for the README.md content on the canvas
    await expect(page.getByText('README.md').first()).toBeVisible();
  });
});
