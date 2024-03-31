import AxeBuilder from "@axe-core/playwright";
import { Page, expect } from "@playwright/test";

export async function expectAccessible(page: Page) {
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); // 4

  expect(accessibilityScanResults.violations).toEqual([]);
}
