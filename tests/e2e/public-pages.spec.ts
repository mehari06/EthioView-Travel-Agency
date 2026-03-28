import { expect, test } from "@playwright/test";

test("public pages load without the global server error screen", async ({ page }) => {
  const routes = ["/", "/destinations", "/tours", "/hotels", "/cabins", "/about"];

  for (const route of routes) {
    await page.goto(route);
    await expect(page.getByText("Something went wrong!")).toHaveCount(0);
    await expect(page.locator("h1").first()).toBeVisible();
  }
});

test("lodge detail page loads booking section", async ({ page }) => {
  await page.goto("/cabins/1");
  await expect(page.getByText(/Reserve .* today\. Pay on arrival\./i)).toBeVisible();
  await expect(page.getByText("Something went wrong!")).toHaveCount(0);
});
