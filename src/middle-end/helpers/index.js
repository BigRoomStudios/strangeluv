const Immer = require('immer');
const Normalizr = require('normalizr');

const internals = {};

exports.type = {
    async: { isAsync: true },
    simple: { isSimple: true }
};

exports.makeTypes = (prefix, config) => {

    if (!config) {
        config = prefix;
        prefix = null;
    }

    prefix = prefix ? `${prefix}/` : '';

    return Object.entries(config).reduce((collect, [name, type]) => {

        const base = `${prefix}${name}`;

        if (type.isAsync) {
            return {
                ...collect,
                [name]: {
                    base,
                    BEGIN: `${base}/BEGIN`,
                    SUCCESS: `${base}/SUCCESS`,
                    FAIL: `${base}/FAIL`
                }
            };
        }

        if (type.isSimple || type === true) {
            return {
                ...collect,
                [name]: base
            };
        }

        return {
            ...collect,
            [name]: type
        };
    }, {});
};

exports.makeReducer = (config, initialState, handlers) => {

    if (typeof handlers === 'undefined') {
        handlers = initialState;
        initialState = config;
        config = {};
    }

    if (__DEV__ && handlers.hasOwnProperty('undefined')) {
        throw new Error('Reducer has an undefined handler. Ensure that all actions used in this reducer exist.');
    }

    const { mutable = false } = config;

    if (mutable) {
        handlers = { ...handlers };
        Object.keys(handlers).forEach((key) => {

            handlers[key] = Immer.produce(handlers[key]);
        });
    }

    return (state = initialState, action) => {

        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        }

        return state;
    };
};

exports.makeAction = (actionTypes, config) => {

    if (typeof actionTypes === 'string') {
        return internals.simpleAction(actionTypes, config);
    }

    return internals.asyncAction(actionTypes, config);
};

internals.simpleAction = (actionType, config = {}) => {

    if (typeof config === 'function') {
        config = { transform: config };
    }

    const {
        transform = internals.defaultTransform
    } = config;

    return (...args) => ({
        type: actionType,
        payload: transform(...args)
    });
};

internals.asyncAction = (actionTypes, config = {}) => {

    if (typeof config === 'function') {
        config = { handler: config };
    }

    const {
        handler = internals.defaultTransform,
        transform = internals.defaultTransform,
        after,
        schema,
        indexed = false
    } = config;

    return (...args) => {

        return async (dispatch) => {

            const beginPayload = transform(...args);
            const computedArgs = ([].concat(beginPayload));
            const index = (() => {

                if (!indexed) {
                    return null;
                }

                if (typeof indexed === 'string') {
                    return indexed;
                }

                if (typeof indexed === 'function') {
                    return indexed(...computedArgs);
                }

                return actionTypes.base;
            })();

            try {

                dispatch({
                    type: actionTypes.BEGIN,
                    payload: beginPayload,
                    meta: {
                        index
                    }
                });

                let successPayload = await handler(...computedArgs);

                if (schema) {
                    successPayload = Normalizr.normalize(successPayload, schema);
                }

                dispatch({
                    type: actionTypes.SUCCESS,
                    payload: successPayload,
                    meta: {
                        original: beginPayload,
                        index
                    }
                });

                // after will possibly fire async

                if (after) {
                    after({
                        original: beginPayload,
                        result: successPayload
                    });
                }

                return [null, successPayload];
            }
            catch (errObj) {

                const error = internals.ensureError(errObj);

                dispatch({
                    type: actionTypes.FAIL,
                    payload: error,
                    error: true,
                    meta: {
                        original: beginPayload,
                        index
                    }
                });

                if (__DEBUG__) {
                    console.error(error);
                }

                return [error];
            }
        };
    };
};

internals.defaultTransform = (...args) => {

    if (args.length === 1) {
        return args[0];
    }

    return args;
};

internals.ensureError = (obj) => {

    if (obj instanceof Error) {
        return obj;
    }

    const error = new Error(obj.message);
    error.data = obj;

    return error;
};
