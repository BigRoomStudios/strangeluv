const { LOGIN } = require('./action-types');

exports.getIsAuthenticated = ({ auth }) => {

    const { [LOGIN.BASE]: index } = auth.indexes;

    if (!index) {
        return false;
    }

    // bigroomstudios/strange-middle-end#8 will allow us to determine the type of action (i.e., login or logout)
    // instead of checking for the payload shape
    const isLoginPayload = (payload) => {

        return  Object.keys(payload).includes('token') || ['email', 'password'].every((key) => Object.keys(payload).includes(key));
    };

    if (!isLoginPayload(index.original || {})) {
        return false;
    }

    return !!(index.result && !index.result.loggedOut && !index.error);

};

exports.getHasAuthenticationSettled = ({ auth }) => {

    const { [LOGIN.BASE]: index } = auth.indexes;

    return Boolean(index && (index.result || index.error));
};

exports.getToken = ({ auth }) => {

    const { [LOGIN.BASE]: index } = auth.indexes;
    const { token } = index.result || {};

    if (typeof token !== 'undefined') {

        return token;
    }
};
