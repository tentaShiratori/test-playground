// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from "@storybook/react";

import Page from "./page";

const meta: Meta<typeof Page> = {
  component: Page,
};

export default meta;
type Story = StoryObj<typeof Page>;

/*
 * See https://storybook.js.org/docs/writing-stories/play-function#working-with-the-canvas
 * to learn more about using the canvasElement to query the DOM
 */
export const Primary: Story = {};
