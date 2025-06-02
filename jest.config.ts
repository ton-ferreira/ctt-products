import { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./src/setupTests.ts"],
  transform: {
    ".+\\.(css|styl|less|sass|scss)$": "jest-transform-css",
  },
};

export default config;
