const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const withPlugins = require('next-compose-plugins');
const withAntdLess = require('next-plugin-antd-less');

const isProduction = process.env.NODE_ENV === 'production';

const pwaConfig = {
    pwa: {
        disable: !isProduction,
        dest: 'public',
        register: true,
        runtimeCaching,
    },
};

const antdLessConfig = {
    lessVarsFilePath: './theme/variables.less',
    cssLoaderOptions: {
        mode: 'local',
        localIdentName: !isProduction ? '[local]--[hash:base64:4]' : '[hash:base64:8]',
        exportLocalsConvention: 'camelCase',
        exportOnlyLocals: false,
    },
};

module.exports = withPlugins(
    [
        [withPWA, pwaConfig],
        [withAntdLess, antdLessConfig],
    ],
    {
        webpack(config) {
            return config;
        },
        images: {
            domains: ['res.cloudinary.com', 'img.youtube.com'],
        },
    },
);
