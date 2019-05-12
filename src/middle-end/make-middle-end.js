const Redux = require('redux');
const CreateStore = require('./helpers/create-store');
const PickEach = require('./helpers/pick-each');

const internals = {};

exports.apply = (M, mods) => {

    if (!mods.router) {
        throw new Error('"router" must be specified in mods');
    }

    // Alphabet sort keys for purpose of having consistent-ish redux dev tools
    // I know object keys order is never guaranteed but this seems to help my brain feels
    M.mods = Object.keys(mods)
        .sort()
        .reduce((obj, key) => {

            obj[key] = mods[key];
            return obj;
        }, {});

    M.reducer = Redux.combineReducers(PickEach(M.mods, 'reducer'));

    M.store = CreateStore(M.reducer, {
        history: mods.router.history
    });

    M.getState = M.store.getState;

    M.dispatch = M.store.dispatch;

    M.actions = PickEach(M.mods, 'actions');

    M.selectors = PickEach(M.mods, 'selectors');

    M.init = () => {

        Object.values(M.mods)
            .filter((mod) => mod.init)
            .forEach((mod) => mod.init(M.store, mod));
    };

    // Convenient dispatch,
    // dispatch.auth.login() versus dispatch(actions.auth.login())
    Object.entries(M.actions).forEach(([modName, actions]) => {

        M.dispatch[modName] = {};

        Object.entries(actions).forEach(([actionName, action]) => {

            M.dispatch[modName][actionName] = (...args) => M.dispatch(action(...args));
        });
    });

    return M;
};
