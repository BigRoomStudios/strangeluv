module.exports = {

    getUserName: (state) => state.auth.credentials.user.firstName,
    getIsAuthenticated: (state) => state.auth.isAuthenticated,
    getAuthStatus: (state) => state.auth.status,
    getShouldRemember: (state) => state.auth.remember,
    getToken: (state) => {

        if (!module.exports.getIsAuthenticated(state)) {
            return false;
        }

        return state.auth.credentials.token;
    }
};
