import vitestConfig from "@frontend-coding-exam/common-config/vitest/vitest.config";
import { defineConfig, mergeConfig } from "vitest/config";

export default mergeConfig(vitestConfig, defineConfig({}));
