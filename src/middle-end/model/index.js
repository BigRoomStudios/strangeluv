const MiddleEnd = require('strange-middle-end');
const Schema = require('./schema');
const { FETCH_CURRENT_USER } = require('../auth/action-types');
const Helpers = require('../helpers');

const internals = {};

module.exports = (m) => {

    const { createReducer, createEntityReducer } = MiddleEnd;

    const entityReducer = createEntityReducer({ schema: Schema });
    const bothReducers = (r1, r2) => {

        return (state, action) => r2(r1(state, action), action);
    };

    return {
        actions: {},
        selectors: {},
        reducer: bothReducers(entityReducer, createReducer({ mutable: true }, {}, {
            ...Helpers.logoutHandlers((model) => {

                Object.keys(model.indexes).forEach((index) => {

                    if (index === FETCH_CURRENT_USER.BASE) {
                        return; // This index can stay around, as it maintains auth state
                    }

                    delete model.indexes[index];
                });

                Object.keys(model.entities).forEach((entity) => {

                    model.entities[entity] = {};
                });
            })
        }))
    };
};
