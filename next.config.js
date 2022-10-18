const path = require('path');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const withPlugins = require('next-compose-plugins');
const withAntdLess = require('next-plugin-antd-less');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

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

module.exports = withPlugins([[withPWA, pwaConfig], [withAntdLess, antdLessConfig], [withBundleAnalyzer]], {
    webpack(config, options) {
        config.resolve.alias['@ant-design/icons/lib/dist$'] = path.join(__dirname, './icons.js');
        return config;
    },
    images: {
        domains: ['res.cloudinary.com', 'img.youtube.com'],
    },
});
