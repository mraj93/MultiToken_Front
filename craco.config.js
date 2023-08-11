// const webpack = require('webpack');
// const dotenv = require('dotenv').config();
//
// const environmentVariables = {};
// for (const key in dotenv.parsed) {
//     environmentVariables[`process.env.${key}`] = JSON.stringify(dotenv.parsed[key]);
// }
//
// module.exports = {
//     webpack: {
//         configure: (webpackConfig) => {
//             if (!webpackConfig.resolve.fallback) {
//                 webpackConfig.resolve.fallback = {};
//             }
//             webpackConfig.resolve.fallback.crypto = require.resolve('crypto-browserify');
//
//             // Add environment variables to the DefinePlugin
//             webpackConfig.plugins.push(
//                 new webpack.DefinePlugin(environmentVariables)
//             );
//
//             return webpackConfig;
//         },
//     },
// };

const webpack = require('webpack');
const dotenv = require('dotenv').config();

const environmentVariables = {};
for (const key in dotenv.parsed) {
    environmentVariables[`process.env.${key}`] = JSON.stringify(dotenv.parsed[key]);
}

module.exports = {
    webpack: {
        configure: (webpackConfig) => {
            if (!webpackConfig.resolve.fallback) {
                webpackConfig.resolve.fallback = {};
            }
            webpackConfig.resolve.fallback.crypto = require.resolve('crypto-browserify');

            // Add environment variables to the DefinePlugin
            webpackConfig.plugins.push(
                new webpack.DefinePlugin({
                    ...environmentVariables, // Keep existing environment variables
                    'BUILD_AT': JSON.stringify(Date.now().toString(32)),
                    'DEBUG': process.env.NODE_ENV !== 'production',
                })
            );

            return webpackConfig;
        },
    },
};
