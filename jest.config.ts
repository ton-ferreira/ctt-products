import { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./src/setupTests.ts"],
  transform: {
    ".+\\.(css|styl|less|sass|scss)$": "jest-transform-css",
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.svg$": "jest-transformer-svg",
  },
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "\\.svg$": "<rootDir>/svg.ts",
  },
};

export default config;
