'use strict';

const Path = require('path');

module.exports = {
    process: (src, filename) => {

        const assetFilename = JSON.stringify(Path.basename(filename));

        return `module.exports = ${assetFilename};`;
    }
};
