'use strict';

const Path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Config = require('.');

module.exports = {
    mode: Config.isProduction ? 'production' : 'development',
    bail: Config.isProduction,
    devtool: Config.sourceMaps && (
        Config.isProduction ? 'source-map' : 'cheap-module-source-map'
    ),
    entry: Config.paths.src('index.js'),
    output: {
        filename: Config.isProduction ?
            'js/[name].[contenthash:8].js' :
            'js/bundle.js',
        path: Config.paths.build(),
        publicPath: Config.publicPath,
        // Allows clickable/openable stacktraces in development
        devtoolModuleFilenameTemplate: Config.isProduction ?
            (info) => Path.relative(Path.resolve(__dirname, 'src'), info.absoluteResourcePath).replace(/\\/g, '/') :
            (info) => Path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
    },
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    },
    plugins: [
        new Webpack.ProgressPlugin(),
        new ErrorOverlayPlugin(),
        new Webpack.DefinePlugin({
            'process.env': Object.entries(Config.buildEnv)
                .reduce((collect, [key, value]) => ({
                    ...collect,
                    [key]: JSON.stringify(value)
                }), {})
        }),
        new CopyWebpackPlugin([
            {
                from: Config.paths.src('static'),
                to: Config.paths.build()
            }
        ]),
        new HtmlWebpackPlugin({
            template: Config.paths.src('index.html'),
            favicon: Config.paths.src('static', 'favicon.ico')
        })
    ],
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    cache: true,
                    formatter: require.resolve('react-dev-utils/eslintFormatter')
                }
            },
            {
                oneOf: [
                    {
                        test: /\.(js|mjs|jsx|ts|tsx)$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader',
                        options: {
                            sourceType: 'unambiguous',
                            customize: require.resolve('babel-preset-react-app/webpack-overrides'),
                            cacheDirectory: true,
                            cacheCompression: false,
                            compact: Config.isProduction
                        }
                    },
                    {
                        test: /\.(js|mjs)$/,
                        exclude: /@babel(?:\/|\\{1,2})runtime/,
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    require.resolve('babel-preset-react-app/dependencies'),
                                    { helpers: true }
                                ]
                            ],
                            babelrc: false,
                            configFile: false,
                            compact: false,
                            cacheDirectory: true,
                            cacheCompression: false,
                            // If an error happens in a package, it's possible to be
                            // because it was compiled. Thus, we don't want the browser
                            // debugger to show the original code. Instead, the code
                            // being evaluated would be much more helpful.
                            sourceMaps: false
                        }
                    },
                    {
                        test: /\.(png|svg|jpg|gif)$/,
                        loader: 'file-loader'
                    }
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    priority: -10,
                    test: /[\\/]node_modules[\\/]/
                }
            },
            chunks: 'async',
            minChunks: 1,
            minSize: 30000,
            name: true
        }
    },
    devServer: {
        hot: true,
        historyApiFallback: true,
        ...Config.devServer
    }
};
