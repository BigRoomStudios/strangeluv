const H = require('middle-end/helpers');

const internals = {};

// Actions here, see counter/actions for examples

internals.withErrorValidation = async (promise) => {

    try {
        return await promise;
    }
    catch (err) {
        if (err.response && err.response.data && err.response.data.validation) {
            err.validation = err.response.data.validation;
        }
        throw err;
    }
};
