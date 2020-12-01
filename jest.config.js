module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@boiler/(.*)$': '<rootDir>/src/lib/$1',
    '^~/(.*)$': '<rootDir>/src/$1'
  },
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTest.ts',
  ],
}
