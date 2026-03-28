import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 180000,
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:3000",
    navigationTimeout: 60000,
    trace: "on-first-retry",
  },
  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:3000",
    env: {
      AUTH_SECRET: "playwright-test-secret",
      AUTH_GOOGLE_ID: "playwright-google-id",
      AUTH_GOOGLE_SECRET: "playwright-google-secret",
      NEXT_PUBLIC_SUPABASE_URL: "https://placeholder.invalid",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: "playwright-anon-key",
    },
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
