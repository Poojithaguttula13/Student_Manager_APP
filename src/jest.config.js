module.exports = {
    transform: {
      '^.+\\.[jt]sx?$': 'babel-jest',
    },
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
    testEnvironment: "jsdom",
    transformIgnorePatterns: [
      'node_modules/(?!(axios)/)', // tell Jest to process axios
    ],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // for CSS imports
      '\\.(jpg|jpeg|png|svg)$': '<rootDir>/__mocks__/fileMock.js' // optional
    },
    moduleFileExtensions: ['js', 'jsx'],
    setupFiles: ['<rootDir>/jest.setup.js'], // or setupTests.js

  };
  