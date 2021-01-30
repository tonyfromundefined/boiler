module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@internal/(.*)$': '<rootDir>/src/lib/$1',
    '^~/(.*)$': '<rootDir>/src/$1'
  },
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTest.ts',
  ],
}
