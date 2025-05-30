import type { Config } from "jest";

const config: Config = {
  verbose: true,
  setupFiles: ["<rootDir>/setup.jest.js"],
  moduleNameMapper: {
    "^#/(.*)$": "<rootDir>/src/$1",
    "^types/(.*)$": "<rootDir>/src/@types/$1",
  },
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
};

export default config;
