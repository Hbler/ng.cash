/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  coverageProvider: "v8",
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: [
    "**/__tests__/unit/*.[jt]s?(x)",
    "**/__tests__/itegration/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)",
  ],
};
