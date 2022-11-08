const path = require('path');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const withPlugins = require('next-compose-plugins');
const withLess = require('next-with-less');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

const isProduction = process.env.NODE_ENV === 'production';

const pwaConfig = {
    pwa: {
        dest: 'public',
        register: true,
        runtimeCaching,
        disable: !isProduction,
    },
};

const antdLessVariables = path.resolve('./theme/variables.less');

const antdLessConfig = {
    lessLoaderOptions: {
        additionalData: (content) => `${content}\n\n@import '${antdLessVariables}';`,
    },
};

/**
 * @type {import('next').NextConfig}
 */
module.exports = withPlugins([[withPWA, pwaConfig], [withLess, antdLessConfig], [withBundleAnalyzer]], {
    webpack(config) {
        config.resolve.alias['@ant-design/icons/lib/dist$'] = path.join(__dirname, './icons.js');
        return config;
    },
    images: {
        domains: [
            'cdn.kcak11.com',
            'img.youtube.com',
            'res.cloudinary.com',
            'lh3.googleusercontent.com',
            'platform-lookaside.fbsbx.com',
        ],
    },
});
