// jest.config.js
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

module.exports = {
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>client-details/setupTests.js'],

  globals: {
    randomInt: getRandomInt(1, 101),
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules',
  },
};
