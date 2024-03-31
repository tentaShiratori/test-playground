// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from "@storybook/react";

import { expect, fn } from "@storybook/test";

import { waitFor } from "@testing-library/dom";
import { Three } from "./Three";

const meta: Meta<typeof Three> = {
  component: Three,
};

export default meta;
type Story = StoryObj<typeof Three>;

// Function to emulate pausing between interactions
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/*
 * See https://storybook.js.org/docs/writing-stories/play-function#working-with-the-canvas
 * to learn more about using the canvasElement to query the DOM
 */
export const FilledForm: Story = {
  args: {
    onPointerEnter: fn(),
  },
  play: async ({ canvasElement, args }) => {
    await sleep(2000);
    window.dispatchEvent(
      new PointerEvent("pointermove", {
        clientX: 0,
        clientY: 0,
      }),
    );
    expect(args.onPointerEnter).not.toHaveBeenCalled();
    window.dispatchEvent(
      new PointerEvent("pointermove", {
        clientX: window.innerWidth / 2,
        clientY: window.innerHeight / 2,
      }),
    );
    await waitFor(() => expect(args.onPointerEnter).toHaveBeenCalled());
  },
};
