// jest.config.ts
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  // Jest pathing to match tsconfig.json
  moduleNameMapper: {
    '^trpc/(.*)$': '<rootDir>/src/trpc/$1',
    '^prisma/(.*)$': '<rootDir>/prisma/$1',
    '^types/(.*)$': '<rootDir>/src/types/$1',
  },
};

export default config;