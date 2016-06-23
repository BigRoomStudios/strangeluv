const Fs = require('fs-extra');
const WebpackCompiler = require('../config/webpack-compiler');
const WebpackConfig = require('../config/webpack.config');
const Config = require('../config/main');
const Debug = require('debug')('app:bin:compile');

const paths = Config.utils_paths;

Debug('Run compiler');

WebpackCompiler(WebpackConfig)
.then((stats) => {

    if (stats.warnings.length && Config.compiler_fail_on_warning) {
        Debug('Config set to fail on warning, exiting with status code "1".');
        process.exit(1);
    }

    Debug('Copy static assets to dist folder.');
    Fs.copySync(paths.client('static'), paths.dist());
})
.catch((err) => {

    Debug('Compiler encountered an error.', err);
    process.exit(1);
});
