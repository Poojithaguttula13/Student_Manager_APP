module.exports = {
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  transformIgnorePatterns: [
    'node_modules/(?!(axios)/)', // tell Jest to process axios
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // for CSS imports
    '\\.(jpg|jpeg|png|svg)$': '<rootDir>/__mocks__/fileMock.js' // optional
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
};
