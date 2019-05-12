const Redux = require('redux');
const Immer = require('immer');
const { schema: { Entity } } = require('normalizr');

const internals = {};

exports.make = (schema) => {

    return Redux.combineReducers({
        indexes: (state = {}, { type, payload, error, meta }) => {

            if (!meta || !meta.index) {
                return state;
            }

            return Immer.produce(state, (draft) => {

                const index = draft[meta.index] = draft[meta.index] || {
                    original: undefined,
                    result: undefined,
                    error: null,
                    inFlight: 0
                };

                if (type.endsWith('/BEGIN')) {
                    index.inFlight++;
                    index.original = payload;
                }

                if (type.endsWith('/SUCCESS') || type.endsWith('/FAIL')) {
                    index.inFlight--;
                    if (meta.hasOwnProperty('original')) {
                        index.original = meta.original;
                    }
                }

                if (type.endsWith('/SUCCESS')) {
                    index.error = null;
                }

                if (error) {
                    index.error = payload || true;
                }

                if (payload && payload.hasOwnProperty('result')) {
                    index.result = payload.result;
                }
            });
        },
        // Keeps a dictionary of entities by key and id
        entities: (state = internals.getInitialEntityState(schema), { payload, error }) => {

            if (error || !payload || !payload.entities) {
                return state;
            }

            return Immer.produce(state, (draft) => {

                const { entities } = payload;

                Object.keys(entities).forEach((entityKey) => {

                    if (!state[entityKey]) {
                        return;
                    }

                    Object.keys(entities[entityKey]).forEach((id) => {

                        const entity = entities[entityKey][id];

                        if (entity._top) {
                            draft[entityKey][id] = draft[entityKey][id] || {};

                            // Preserve parts of an entity we've seen in past actions, but not this one
                            // We'll use forEach because Object.assign would set those aforementioned parts to undefined
                            Object.entries(entity).forEach(([key, val]) => {

                                if (typeof val !== 'undefined') {
                                    draft[entityKey][id][key] = val;
                                }
                            });
                        }
                        else {
                            draft[entityKey][id] = entity;
                        }
                    });
                });
            });
        }
    });
};

internals.getInitialEntityState = (schema) => {

    return Object.values(schema)
        .filter((entity) => entity instanceof Entity)
        .reduce((collect, entity) => ({
            ...collect,
            [entity.key]: {}
        }), {});
};
