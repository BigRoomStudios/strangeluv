const { LOGIN } = require('./action-types');

exports.getIsAuthenticated = ({ auth }) => {

    const { [LOGIN.BASE]: index } = auth.indexes;

    if (!index) {
        return false;
    }

    // bigroomstudios/strange-middle-end#8 will allow us to determine the type of action (i.e., login or logout)
    // instead of checking for the payload shape
    const isLoginPayload = (payload) => {

        return ['email', 'password'].every((key) => Object.keys(payload).includes(key));
    };

    if (!isLoginPayload(index.original || {})) {
        return false;
    }

    return !!(index.result && !index.error);
};
