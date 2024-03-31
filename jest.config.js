const nextJest = require("next/jest.js");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/**
 * @type {import("jest").Config}
 */
const config = {
  moduleNameMapper: {
    "^lodash-es$": "lodash",
  },
  coverageProvider: "v8",
  coveragePathIgnorePatterns: [
    "<rootDir>/lib/\\$path.ts",
    "<rootDir>/test",
    "node_modules",
  ],
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/.next/**",
    "!**/.storybook/**",
    "!**/e2e/**",
    "!**/*.stories.{ts,tsx}",
    "!**/*.config.{ts,tsx}",
  ],
  coverageDirectory: "<rootDir>/coverage/results",
  coverageReporters: ["json", "text-summary"],
  // runner: "@kayahr/jest-electron-runner",
  // testEnvironment: "@kayahr/jest-electron-runner/environment",
  // testRunner: "@kayahr/jest-electron-runner",
  // runner: "@pixi/jest-electron/runner",
  // testEnvironment: "@pixi/jest-electron/environment",
  testEnvironment: "jsdom",
  // setupFiles: ["jest-webgl-canvas-mock"],
  // Add more setup options before each test is run
  setupFilesAfterEnv: [
    "<rootDir>/jest.polyfills.js",
    "<rootDir>/jest.setup.ts",
  ],
  testEnvironmentOptions: {
    // 参考: https://stackoverflow.com/questions/77399773/cannot-find-module-msw-node-from
    customExportConditions: [""],
  },
  testPathIgnorePatterns: ["<rootDir>/e2e/"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config);
