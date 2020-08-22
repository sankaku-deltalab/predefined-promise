module.exports = {
  preset: 'ts-jest',
  testMatch: ['**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)'],
  collectCoverageFrom: ['packages/**/src/**/*.ts'],
};
