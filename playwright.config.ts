/**
 * ========================================================================================
 * @file playwright.config.ts - playwright end-to-end testing configuration
 * ========================================================================================
 * @description
 * - configures testing directories, parallel execution, and html reporters
 * - automatically spins up a local dev server on port 3001 before running test suites
 * @see /tests/, /package.json/
 */

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  outputDir: './tests/results',
  reporter: [['html', { outputFolder: 'tests/report' }]],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: 'http://localhost:3001',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3001',
    reuseExistingServer: !process.env.CI,
  },
});
