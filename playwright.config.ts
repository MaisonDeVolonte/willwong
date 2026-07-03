/**
 * ========================================================================================
 * @file playwright.config.ts - playwright end-to-end testing configuration
 * ========================================================================================
 * @description
 * - configures testing directories, test execution, and html reporters
 * - automatically spins up a local dev server on port 3001 before running test suites
 * @see /tests/, /package.json/
 */

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  outputDir: './tests/results',
  reporter: [['html', { outputFolder: 'tests/report' }]],
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  use: {
    baseURL: 'http://localhost:3001',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile',
      use: { ...devices['iPhone 13'] },
    },
  ],
  webServer: {
    command: process.env.CI ? 'npm run start -- -p 3001' : 'npm run dev',
    url: 'http://localhost:3001',
    reuseExistingServer: !process.env.CI,
  },
});
