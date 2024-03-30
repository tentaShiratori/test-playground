// Replace your-framework with the name of your framework
import { Slider } from "@/components/ui/slider";
import type { Meta, StoryObj } from "@storybook/react";

import { expect, fn, userEvent, within } from "@storybook/test";

import { waitFor } from "@testing-library/dom";

const meta: Meta<typeof Slider> = {
  component: Slider,
};

export default meta;
type Story = StoryObj<typeof Slider>;

/*
 * See https://storybook.js.org/docs/writing-stories/play-function#working-with-the-canvas
 * to learn more about using the canvasElement to query the DOM
 */
export const Primary: Story = {
  args: {
    min: 0,
    max: 1,
    step: 0.1,
    onValueChange: fn(),
  },
};
