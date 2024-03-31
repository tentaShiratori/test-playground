import { expectAccessible } from "@/test/a11y/playwright";
import { test } from "playwright-test-coverage";

test("a11y", async ({ page }) => {
  await page.goto("/");
  await expectAccessible(page);
});
