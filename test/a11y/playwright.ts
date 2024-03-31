import { Page, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

export async function expectAccessible(page: Page) {
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); // 4

  expect(accessibilityScanResults.violations).toEqual([]);
}
