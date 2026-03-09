import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.e2e.spec.ts',
  fullyParallel: false,
  timeout: 30000,
  retries: 0,
  use: {
    baseURL: process.env.VITE_FRONTEND_URL || 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: [
    {
      command: 'npm run dev',
      url: 'http://localhost:5000/api/health',
      reuseExistingServer: !process.env.CI,
      timeout: 15000,
    },
    {
      command: 'npm run dev --prefix ../',
      url: 'http://localhost:5173',
      reuseExistingServer: !process.env.CI,
      timeout: 15000,
    },
  ],
});