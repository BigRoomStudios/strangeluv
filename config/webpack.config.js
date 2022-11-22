'use strict';

const Path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const Config = require('.');

const publicPath = Config.isProduction ? Config.publicPath.replace(/\/*$/, '/') : '/';

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
            'js/[name].bundle.js',
        chunkFilename: Config.isProduction ?
            'js/[name].[contenthash:8].chunk.js' :
            'js/[name].chunk.js',
        path: Config.paths.build(),
        publicPath,
        devtoolModuleFilenameTemplate: Config.isProduction ?
            (info) => Path.relative(Config.paths.src(), info.absoluteResourcePath).replace(/\\/g, '/') :
            (info) => Path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
    },
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom',
            '@mui/styled-engine': '@mui/styled-engine-sc'
        }
    },
    plugins: [
        new Webpack.ProgressPlugin(),
        new ErrorOverlayPlugin(),
        new Webpack.DefinePlugin({
            'process.env': Object.entries({
                ...Config.buildEnv,
                BASE_PATH: publicPath
            })
                .reduce((collect, [key, value]) => ({
                    ...collect,
                    [key]: JSON.stringify(value)
                }), {})
        }),
        new Webpack.ProvidePlugin({
            process: 'process/browser'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: Config.paths.src('public'),
                    to: Config.paths.build()
                }
            ]
        }),
        new HtmlWebpackPlugin({
            template: Config.paths.src('index.html'),
            favicon: Config.paths.src('public', 'favicon.ico')
        }),
        new ESLintWebpackPlugin({
            formatter: require.resolve('react-dev-utils/eslintFormatter')
        })
    ],
    module: {
        rules: [
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
                            sourceMaps: false
                        }
                    },
                    {
                        exclude: /\.(js|html|json)$/,
                        loader: 'file-loader',
                        options: {
                            name: 'media/[name].[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    devServer: {
        hot: true,
        historyApiFallback: true,
        devMiddleware: {
            publicPath
        },
        static: {
            serveIndex: true

        },
        ...Config.devServer
    }
};
