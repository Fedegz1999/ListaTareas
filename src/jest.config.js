// jest.config.js
module.exports = {
  setupFiles: ['<rootDir>/setupTests.js'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};