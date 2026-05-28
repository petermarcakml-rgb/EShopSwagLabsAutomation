import type { PlaywrightTestConfig } from '@playwright/test'
import { devices } from '@playwright/test'

const config: PlaywrightTestConfig = {
  testDir: './src/tests',
  outputDir: './test-results',

  use: {
    headless: true,
    ignoreHTTPSErrors: true,
    locale: 'en-EN',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1012 },
        actionTimeout: 0,
      },
    },],

  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['line'],
  ],

  retries: 0,
  timeout: 45000,
  expect: { timeout: 15000 },
}

export default config
