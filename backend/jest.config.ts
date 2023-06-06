// jest.config.ts
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  // Jest pathing to match tsconfig.json
  moduleNameMapper: {
    '^trpc/(.*)$': '<rootDir>/backend/src/trpc/$1',
    '^prisma/(.*)$': '<rootDir>/backend/prisma/$1',
    '^types/(.*)$': '<rootDir>/backend/src/types/$1',
  },
};

export default config;