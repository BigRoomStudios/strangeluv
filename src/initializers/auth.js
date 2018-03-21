const LocalStorageAvailable = require('utils/check-local-storage');
const AuthActions = require('actions/auth');
const AuthSelectors = require('selectors/auth');

module.exports = (store) => {

    if (!LocalStorageAvailable()) {
        store.dispatch(AuthActions.login({ token: false }));
        return;
    }

    const persistSet = (key, value) => localStorage.setItem(key, JSON.stringify(value));
    const persistGet = (key) => JSON.parse(localStorage.getItem(key) || 'null');
    const persistRemove = (key) => localStorage.removeItem(key);

    // const getShouldRemember = () => selectors.getShouldRemember(store.getState());
    const getIsAuthenticated = () => AuthSelectors.getIsAuthenticated(store.getState());
    const getToken = () => AuthSelectors.getToken(store.getState());

    // const remember = persistGet('remember') || false;
    const token = persistGet('token');

    // store.dispatch(AuthActions.rememberMe({ remember }));

    store.subscribe(() => {

        // if (!getShouldRemember()) {
        //     persistSet('remember', false);
        //     persistRemove('token');
        // }
        // else {

        persistSet('remember', true);
        if (getIsAuthenticated()) {
            persistSet('token', getToken());
        }
        else {
            persistRemove('token');
        }

        // }
    });

    if (token) {
        store.dispatch(AuthActions.login({ token }));
    }
};
