// const webpack = require('webpack');
// const dotenv = require('dotenv').config();
//
// // Create a custom module to export environment variables
// const environmentVariables = {};
// for (const key in dotenv.parsed) {
//     environmentVariables[`process.env.${key}`] = JSON.stringify(dotenv.parsed[key]);
// }
//
// module.exports = {
//     webpack: {
//         configure: (webpackConfig) => {
//             // Add fallback for 'crypto' module
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
            // Add fallback for 'crypto' module
            if (!webpackConfig.resolve.fallback) {
                webpackConfig.resolve.fallback = {};
            }
            webpackConfig.resolve.fallback.crypto = require.resolve('crypto-browserify');

            // Add environment variables to the DefinePlugin
            webpackConfig.plugins.push(
                new webpack.DefinePlugin(environmentVariables)
            );

            return webpackConfig;
        },
    },
};
