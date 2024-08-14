module.exports = {
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }],
  },
  moduleNameMapper: {
    // Force module uuid to resolve with the CJS entry point, because Jest does not support package.json.exports. See https://github.com/uuidjs/uuid/issues/451
    uuid: require.resolve('uuid'),
  },
  clearMocks: true,
  restoreMocks: true,
  setupFilesAfterEnv: ['jest-launchdarkly-mock', './jest.setup.js'],
  modulePathIgnorePatterns: ['<rootDir>/build/'],
  moduleDirectories: ['node_modules', 'src'],
};
