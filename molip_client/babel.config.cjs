module.exports = {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
        'nativewind/babel',
        [
            'module-resolver',
            {
                root: ['./'],
                alias: {
                    '@pages': './src/pages',
                    '@components': './src/components',
                    '@assets': './assets',
                    '@api': './src/api',
                    '@storage': './src/storage',
                },
            },
        ],
    ],
};
