const Webpack = require('webpack');
const Cssnano = require('cssnano');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Config = require('./main');
const Debug = require('debug')('app:webpack:config');

const paths = Config.utils_paths;
const { __DEV__, __PROD__, __TEST__ } = Config.globals;

Debug('Create configuration.');
const webpackConfig = module.exports = {
    name: 'client',
    target: 'web',
    devtool: Config.compiler_devtool,
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        modules: [
            paths.client(),
            paths.base('node_modules')
        ]
    },
    resolveLoader: {
        modules: [
            paths.base('node_modules')
        ]
    },
    module: {}
};

// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY_PATHS = [
    'babel-polyfill',
    paths.client('main.js')
];

webpackConfig.entry = {
    app: __DEV__
    ? APP_ENTRY_PATHS.concat(`webpack-hot-middleware/client?path=${Config.compiler_public_path}__webpack_hmr`)
    : APP_ENTRY_PATHS,
    vendor: Config.compiler_vendor
};

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
    filename: `[name].[${Config.compiler_hash_type}].js`,
    path: paths.dist(),
    publicPath: Config.compiler_public_path
};

// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [
    new Webpack.DefinePlugin(Config.globals),
    new HtmlWebpackPlugin({
        template: paths.client('index.html'),
        hash: false,
        favicon: paths.client('static/favicon.ico'),
        filename: 'index.html',
        inject: 'body',
        minify: {
            collapseWhitespace: true
        }
    })
];

if (__DEV__) {
    Debug('Enable plugins for live development (HMR, NoErrors).');
    webpackConfig.plugins.push(
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.NoEmitOnErrorsPlugin()
    );
}
else if (__PROD__) {
    Debug('Enable plugins for production (LoaderOptionsPlugin minimize, UglifyJS).');
    webpackConfig.plugins.push(
        new Webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new Webpack.optimize.UglifyJsPlugin({
            sourceMap: !!Config.compiler_devtool,
            compress: {
                unused: true,
                dead_code: true,
                warnings: false
            }
        })
    );
}

// Don't split bundles during testing, since we only want import one bundle
if (!__TEST__) {
    webpackConfig.plugins.push(
    new Webpack.optimize.CommonsChunkPlugin({
        names: ['vendor']
    })
  );
}

// ------------------------------------
// Loaders
// ------------------------------------
// JavaScript
webpackConfig.module.rules = [{
    test: /\.(js|jsx)$/,
    exclude: paths.base('node_modules'),
    use: [
        {
            loader: 'babel-loader',
            options: {
                cacheDirectory: true,
                plugins: ['transform-runtime'],
                presets: ['es2015', 'react', 'stage-0'],
                env: {
                    production: {
                        presets: ['react-optimize']
                    }
                }
            }
        }
    ]
}];

// ------------------------------------
// Style Loaders
// ------------------------------------
// We use cssnano with the postcss loader, so we tell
// css-loader not to duplicate minimization.

const BASE_CSS_LOADER = {
    loader: 'css-loader',
    options: {
        sourceMap: true,
        minimize: false
    }
};

const postCssOptions = {
    plugins: [
        Cssnano({
            autoprefixer: {
                add: true,
                remove: true,
                browsers: ['last 2 versions']
            },
            discardComments: {
                removeAll: true
            },
            discardUnused: false,
            mergeIdents: false,
            reduceIdents: false,
            safe: true,
            sourcemap: true
        })
    ]
};

const sassOptions = {
    sourceMap: true,
    includePaths: [paths.client('styles')]
};


// Add any packge names here whose styles need to be treated as CSS modules.
// These paths will be combined into a single regex.
const PATHS_TO_TREAT_AS_CSS_MODULES = [
    // 'react-toolbox-loader', (example)
];

// If config has CSS modules enabled, treat this project's styles as CSS modules.
if (Config.compiler_css_modules) {
    PATHS_TO_TREAT_AS_CSS_MODULES.push(
        paths.client().replace(/[\^\$\.\*\+\-\?\=\!\:\|\\\/\(\)\[\]\{\}\,]/g, '\\$&') // eslint-disable-line
    );
}

const isUsingCSSModules = !!PATHS_TO_TREAT_AS_CSS_MODULES.length;
const cssModulesRegex = new RegExp(`(${PATHS_TO_TREAT_AS_CSS_MODULES.join('|')})`);

// Loaders for styles that need to be treated as CSS modules.
if (isUsingCSSModules) {
    const cssModulesLoader = {
        loader: 'css-loader',
        options: Object.assign({}, BASE_CSS_LOADER.options, {
            modules: true,
            importLoaders: 1,
            localIdentName: '[name]__[local]___[hash:base64:5]'
        })
    };

    webpackConfig.module.rules.push({
        test: /\.scss$/,
        include: cssModulesRegex,
        use: [
            'style-loader',
            cssModulesLoader,
            {
                loader: 'postcss-loader',
                options: postCssOptions
            },
            {
                loader: 'sass-loader',
                options: sassOptions
            }
        ]
    });

    webpackConfig.module.rules.push({
        test: /\.css$/,
        include: cssModulesRegex,
        use: [
            'style-loader',
            cssModulesLoader,
            {
                loader: 'postcss-loader',
                options: postCssOptions
            }
        ]
    });
}

// Loaders for files that should not be treated as CSS modules.
const excludeCSSModules = isUsingCSSModules ? cssModulesRegex : false;
webpackConfig.module.rules.push({
    test: /\.scss$/,
    exclude: excludeCSSModules,
    use: [
        'style-loader',
        BASE_CSS_LOADER,
        {
            loader: 'postcss-loader',
            options: postCssOptions
        },
        {
            loader: 'sass-loader',
            options: sassOptions
        }
    ]
});

webpackConfig.module.rules.push({
    test: /\.css$/,
    exclude: excludeCSSModules,
    use: [
        'style-loader',
        BASE_CSS_LOADER,
        {
            loader: 'postcss-loader',
            options: postCssOptions
        }
    ]
});

// File loaders
webpackConfig.module.rules.push(
    {
        test: /\.woff(\?.*)?$/,
        use: [{
            loader: 'url-loader',
            options: {
                prefix: 'fonts/',
                name: '[path][name].[ext]',
                limit: 10000,
                mimetype: 'application/font-woff'
            }
        }]
    },
    {
        test: /\.woff2(\?.*)?$/,
        use: [{
            loader: 'url-loader',
            options: {
                prefix: 'fonts/',
                name: '[path][name].[ext]',
                limit: 10000,
                mimetype: 'application/font-woff2'
            }
        }]
    },
    {
        test: /\.otf(\?.*)?$/,
        use: [{
            loader: 'url-loader',
            options: {
                prefix: 'fonts/',
                name: '[path][name].[ext]',
                limit: 10000,
                mimetype: 'font/opentype'
            }
        }]
    },
    {
        test: /\.ttf(\?.*)?$/,
        use: [{
            loader: 'url-loader',
            options: {
                prefix: 'fonts/',
                name: '[path][name].[ext]',
                limit: 10000,
                mimetype: 'application/octet-stream'
            }
        }]
    },
    {
        test: /\.eot(\?.*)?$/,
        use: [{
            loader: 'file-loader',
            options: {
                prefix: 'fonts/',
                name: '[path][name].[ext]'
            }
        }]
    },
    {
        test: /\.svg(\?.*)?$/,
        use: [{
            loader: 'url-loader',
            options: {
                prefix: 'fonts/',
                name: '[path][name].[ext]',
                limit: 10000,
                mimetype: 'image/svg+xml'
            }
        }]
    },
    {
        test: /\.(png|jpg)$/,
        use: [{
            loader: 'url-loader',
            options: { limit: 8192 }
        }]
    }
);

// ------------------------------------
// Finalize Configuration
// ------------------------------------
// when we don't know the public path (we know it only when HMR is enabled [in development]) we
// need to use the extractTextPlugin to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
if (!__DEV__) {
    Debug('Apply ExtractTextPlugin to CSS loaders.');
    webpackConfig.module.rules
    .filter((rule) => {

        return rule.use && rule.use.find((name) => {

            name = (typeof name === 'object') ? name.loader : name;

            return /css/.test(name.split('?')[0]);
        });
    })
    .forEach((rule) => {

        const [first, ...rest] = rule.use;
        rule.use = ExtractTextPlugin.extract({
            fallback: first,
            use: rest
        });
    });

    webpackConfig.plugins.push(
        new ExtractTextPlugin({
            filename: '[name].[contenthash].css',
            allChunks: true
        })
    );
}
