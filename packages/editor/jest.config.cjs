/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */

const base = require('../../jest.base.config.js');

module.exports = {
  ...base,
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^react$': 'preact/compat',
    '^react-dom$': 'preact/compat',
    '^react-dom/test-utils$': 'preact/test-utils',
    '^react/jsx-runtime$': 'preact/jsx-runtime',
  },
};
