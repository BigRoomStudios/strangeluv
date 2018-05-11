const assert = (expression) => {

    if (!expression) {
        throw new Error('Assertion failed!');
    }
};

module.exports = assert;

module.exports.assert = assert;
