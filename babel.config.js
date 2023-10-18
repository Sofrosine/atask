module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@actions': './src/actions',
          '@components': './src/components',
          '@constants': './src/constants',
          '@pages': './src/pages',
          '@reducers': './src/reducers',
          '@routes': './src/routes',
          '@styles': './src/styles',
          '@types': './src/types',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
