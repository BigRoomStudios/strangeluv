module.exports = {

    getIsAuthenticated: (state) => !!state.auth.isAuthenticated,
    getAuthStatus: (state) => state.auth.status,
    getToken: (state) => {

        if (!module.exports.getIsAuthenticated(state)) {
            return false;
        }

        return state.auth.credentials.token;
    }
};
