module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/jest.setup.js'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'text', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  moduleNameMapper: {
    '\\.svg': '<rootDir>/__mocks__/svgMock.js',
    '\\.png': '<rootDir>/__mocks__/assetsTransformer.js',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '@utils': '<rootDir>/src/utils',
    '@reducers': '<rootDir>/src/reducers',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native' +
      '|@react-native-community' +
      '|react-navigation' +
      '|react-native-config',
    ')/)',
  ],
  coveragePathIgnorePatterns: [
    '/App.tsx',
    '/babel.config.js',
    '/.eslintrc.js',
    '/index.js',
    '/jest.config.js',
    '/jest.setup.js',
    '/node_modules/',
    '/src/actions',
    '/src/constants',
    '/src/styles',
    '/src/pages',
    '/src/reducer',
    '/src/routes',
    '/src/services',
    '/src/stores',
    '/src/utils',
  ],
};
