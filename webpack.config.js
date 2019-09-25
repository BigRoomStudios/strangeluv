'use strict';

const Path = require('path');
const Dotenv = require('dotenv');
const Webpack = require('webpack');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

/*
 * We've enabled HtmlWebpackPlugin for you! This generates a html
 * page for you when you compile webpack, which will make you start
 * developing and prototyping faster.
 *
 * https://github.com/jantimon/html-webpack-plugin
 *
 */

Dotenv.config();

const isEnvProduction = process.env.NODE_ENV === 'production';

module.exports = {
    mode: isEnvProduction ? 'production' : 'development',    // TODO
    entry: './src/index.js',
    output: {
        filename: '[name].[hash].js', // TODO HMR vs prod
        path: Path.resolve(__dirname, 'dist'),
        publicPath: '/',    // TODO configurable
        // Allows clickable/openable stacktraces in development
        devtoolModuleFilenameTemplate: isEnvProduction ?
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
        new Webpack.DefinePlugin({
            'process.env': [
                'NODE_ENV'
            ].reduce((collect, key) => ({
                ...collect,
                [key]: JSON.stringify(process.env[key])
            }), {})
        }),
        new ErrorOverlayPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ],
    devtool: 'cheap-module-source-map',    // Not 'eval' for overlay
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    cache: true
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
                            compact: isEnvProduction
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
        open: true,
        hot: true,
        historyApiFallback: true
    }
};
