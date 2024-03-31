import path from "path";
import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../app/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-coverage",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  features: {
    argTypeTargetsV7: true,
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["..\\public"],
  webpackFinal(config) {
    if (!config.resolve) return config;
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "../"),
    };
    return config;
  },
};
export default config;
