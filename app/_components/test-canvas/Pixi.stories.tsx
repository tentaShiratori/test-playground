// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from "@storybook/react";

import { expect, fn, userEvent, within } from "@storybook/test";

import { waitFor } from "@testing-library/dom";
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
export const FilledForm: Story = {
  args: {
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const event = new PointerEvent("mousedown", {
      altKey: false,
      bubbles: true,
      button: 0,
      buttons: 1,
      cancelable: true,
      clientX: 141,
      clientY: 130,
      composed: true,
      ctrlKey: false,
      detail: 0,
      height: 1,
      isPrimary: true,
      metaKey: false,
      movementX: 0,
      movementY: 0,
      pointerId: 1,
      pointerType: "mouse",
      pressure: 0.5,
      relatedTarget: null,
      screenX: 441,
      screenY: 291,
      shiftKey: false,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      which: 1,
      width: 1,
    });
    Object.assign(event, {});
    within(canvasElement).getByTestId("pixi").dispatchEvent(event);
    await sleep(2000);

    await waitFor(() => {
      expect(args.onClick).toHaveBeenCalled();
    });
  },
};
