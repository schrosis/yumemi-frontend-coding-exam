import { defineConfig } from "vitest/config";

/** @type {import('vitest/config').ViteUserConfig} */
const vitestConfig = {
  test: {
    coverage: {
      reporter: ["text", "json-summary", "json"],
      reportOnFailure: true,
    },
  },
};

export default defineConfig(vitestConfig);
