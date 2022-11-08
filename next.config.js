const path = require('path');
const withPWA = require('next-pwa');
const withLess = require('next-with-less');
const runtimeCaching = require('next-pwa/cache');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

const isProduction = process.env.NODE_ENV === 'production';

const antdLessVariables = path.resolve('./theme/variables.less');

/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
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
    reactStrictMode: true,
    lessLoaderOptions: {
        additionalData: (content) => `${content}\n\n@import '${antdLessVariables}';`,
    },
    pwa: {
        dest: 'public',
        register: true,
        runtimeCaching,
        disable: !isProduction,
    },
};

const plugins = [withPWA, withLess, withBundleAnalyzer];

module.exports = () => plugins.reduce((config, plugin) => plugin(config), nextConfig);
