import { ReactElement } from "react";
import { renderApp } from "../renderApp";
import { axe } from "jest-axe";

export async function expectAccessible(
  ...[ui, options]: Parameters<typeof renderApp>
) {
  const { container, rerender } = renderApp(ui, options);
  expect(await axe(container)).toHaveNoViolations();

  return {
    rerender: async (ui: ReactElement) => {
      rerender(ui);
      expect(await axe(container)).toHaveNoViolations();
    },
  };
}
