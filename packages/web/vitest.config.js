import vitestConfig from "@frontend-coding-exam/common-config/vitest/vitest.config";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react from "@vitejs/plugin-react";
import {
  coverageConfigDefaults,
  defineConfig,
  mergeConfig,
} from "vitest/config";

export default mergeConfig(
  vitestConfig,
  defineConfig({
    plugins: [react(), vanillaExtractPlugin()],
    test: {
      environment: "jsdom",
      coverage: {
        exclude: [
          ...coverageConfigDefaults.exclude,
          "**/.storybook/**",
          "**/*.stories.*",
          "**/storybook-static/**",
          "next.config.ts",
        ],
      },
    },
  }),
);
