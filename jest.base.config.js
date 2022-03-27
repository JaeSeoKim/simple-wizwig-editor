/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
  testEnvironment: 'node',
};
