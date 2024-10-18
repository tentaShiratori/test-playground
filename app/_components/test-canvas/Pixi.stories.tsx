// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from "@storybook/react";

import { expect, fn, within } from "@storybook/test";

import { Pixi } from "./Pixi";

const meta: Meta<typeof Pixi> = {
  component: Pixi,
};

export default meta;
type Story = StoryObj<typeof Pixi>;

// Function to emulate pausing between interactions
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/*
 * See https://storybook.js.org/docs/writing-stories/play-function#working-with-the-canvas
 * to learn more about using the canvasElement to query the DOM
 */
export const Primary: Story = {
  args: {
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    await sleep(2000);
    within(canvasElement)
      .getByTestId("pixi")
      .dispatchEvent(
        new PointerEvent("pointerdown", {
          clientX: 10,
          clientY: 10,
        })
      );
    expect(args.onClick).not.toHaveBeenCalled();
    within(canvasElement)
      .getByTestId("pixi")
      .dispatchEvent(
        new PointerEvent("pointerdown", {
          clientX: 65,
          clientY: 65,
        })
      );
    within(canvasElement)
      .getByTestId("pixi")
      .dispatchEvent(
        new PointerEvent("pointerdown", {
          clientX: 10,
          clientY: 10,
        })
      );
    expect(args.onClick).not.toHaveBeenCalled();
    within(canvasElement)
      .getByTestId("pixi")
      .dispatchEvent(
        new PointerEvent("pointerdown", {
          clientX: 66,
          clientY: 66,
        })
      );
    expect(args.onClick).toHaveBeenCalled();
  },
};
Primary.storyName = "クリックできる？";
