module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'nativewind/babel',
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@assets': './assets',
        },
      },
    ],
  ],
};
