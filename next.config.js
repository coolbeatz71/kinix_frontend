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
};

module.exports = withPlugins([
    [withPWA, pwaConfig],
    [withAntdLess, antdLessConfig],
]);
