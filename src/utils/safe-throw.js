const safeThrow = (error) => {

    if (process.env.NODE_ENV !== 'production') {
        throw error;
    }
};

module.exports = safeThrow;

module.exports.safeThrow = safeThrow;
