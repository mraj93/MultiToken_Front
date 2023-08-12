// // const webpack = require('webpack');
// // const dotenv = require('dotenv').config();
// //
// // const environmentVariables = {};
// // for (const key in dotenv.parsed) {
// //     environmentVariables[`process.env.${key}`] = JSON.stringify(dotenv.parsed[key]);
// // }
// //
// // module.exports = {
// //     webpack: {
// //         configure: (webpackConfig) => {
// //             if (!webpackConfig.resolve.fallback) {
// //                 webpackConfig.resolve.fallback = {};
// //             }
// //             webpackConfig.resolve.fallback.crypto = require.resolve('crypto-browserify');
// //
// //             // Add environment variables to the DefinePlugin
// //             webpackConfig.plugins.push(
// //                 new webpack.DefinePlugin(environmentVariables)
// //             );
// //             return webpackConfig;
// //         },
// //     },
// // };
//
// import dotenv from 'dotenv';
// dotenv.config();
//
// const webpack = require('webpack');
//
// const environmentVariables = {};
// for (const key in process.env) {
//     environmentVariables[`process.env.${key}`] = JSON.stringify(process.env[key]);
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
//             return webpackConfig;
//         },
//     },
// };
// \