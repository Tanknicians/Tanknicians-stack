/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "./",
  moduleNameMapper: {
    '^trpc/(.*)$': '<rootDir>/backend/src/trpc/$1',
    '^prisma/(.*)$': '<rootDir>/backend/prisma/$1',
    '^types/(.*)$': '<rootDir>/backend/src/types/$1',
  },
};

