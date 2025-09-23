export default {
  displayName: 'API Helpers Tests',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/test/setup/jest.setup.ts'],
  testMatch: [
    '<rootDir>/test/**/*.test.ts',
    '<rootDir>/test/**/*.test.tsx',
  ],
  collectCoverageFrom: [
    'src/shared/services/api/apiHelpers.ts',
    '!src/**/*.d.ts',
    '!src/**/*.stories.ts',
    '!src/**/*.stories.tsx',
  ],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75,
    },
    'src/shared/services/api/apiHelpers.ts': {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75,
    },
  },
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: {
        jsx: 'react-jsx',
      },
    }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testTimeout: 10000,
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
};
