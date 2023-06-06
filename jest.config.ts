import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "./",
  modulePaths: ["<rootDir>"],
  moduleNameMapper: {
    '^trpc/(.*)$': '<rootDir>/backend/src/trpc/$1',
    '^prisma/(.*)$': '<rootDir>/backend/prisma/$1',
    '^types/(.*)$': '<rootDir>/backend/src/types/$1',
  },
};

export default config;