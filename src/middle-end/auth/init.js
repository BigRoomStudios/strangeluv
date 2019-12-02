const LocalStorageAvailable = require('../../utils/check-local-storage');
const M = require('../../middle-end');

module.exports = ({ store }) => {

    if (!LocalStorageAvailable()) {
        // If there's no local storage, there's no token
        M.dispatch.auth.login({ token: false });
        return;
    }

    const persistSet = (key, value) => localStorage.setItem(key, JSON.stringify(value));
    const persistGet = (key) => JSON.parse(localStorage.getItem(key) || 'null');
    const persistRemove = (key) => localStorage.removeItem(key);

    const getIsAuthenticated = () => M.selectors.auth.getIsAuthenticated(store.getState());
    const getToken = (...args) => M.selectors.auth.getToken(store.getState(), ...args);

    const token = persistGet('token');

    store.subscribe(() => {

        if (getIsAuthenticated()) {
            persistSet('token', getToken());
        }
        else {
            persistRemove('token');
        }
    });

    M.dispatch.auth.login({ token });
};
