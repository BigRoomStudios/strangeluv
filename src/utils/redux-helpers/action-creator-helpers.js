const _ = require('lodash');
const { safeThrow } = require('utils/safe-throw');
const { assert } = require('utils/assert');
const ExtendableError = require('extendable-error-class');
const { isErrorActionType } = require('./action-type-helpers');

const makeActionCreator_ROOT = (type, requestPropTypes, resultPropTypes, options) => {

    if (_.isUndefined(options)) {
        options = resultPropTypes;
        resultPropTypes = undefined;
    }

    return makeActionCreator(type, requestPropTypes, resultPropTypes, options);
};
const makeActionCreator = (type, requestPropTypes, resultPropTypes, {
    async, after, propTransform, requestPropTransform, resultPropTransform } = {}) => {

    assert(isActionType(type));
    assert(_.isUndefined(requestPropTypes) || _.isObject(requestPropTypes));
    assert(_.isUndefined(resultPropTypes) || _.isObject(resultPropTypes));
    assert(_.isUndefined(async) || _.isFunction(async));
    assert(_.isUndefined(after) || isAfter(after));
    assert(_.isUndefined(propTransform) || _.isFunction(propTransform));
    assert(_.isUndefined(requestPropTransform) || _.isFunction(requestPropTransform));
    assert(_.isUndefined(resultPropTransform ) || _.isFunction(resultPropTransform ));

    if (async) {
        assert(_.isUndefined(propTransform));

        return makeAsyncActionCreator(
            { type, requestPropTypes, resultPropTypes, requestPropTransform, resultPropTransform , async, after }
        );
    }
    else if (after || propTransform) {
        assert(_.isUndefined(resultPropTypes));
        assert(_.isUndefined(requestPropTransform));
        assert(_.isUndefined(resultPropTransform ));

        return makeExtendedActionCreator({ type, propTypes: requestPropTypes, propTransform, after });
    }

    assert(_.isUndefined(resultPropTypes));
    assert(_.isUndefined(requestPropTransform));
    assert(_.isUndefined(resultPropTransform ));

    return makeBasicActionCreator({ type, propTypes: requestPropTypes });
};

const makeBasicActionCreator = ({ type, propTypes }) => {

    assert(isSimpleActionType(type));
    assert(_.isUndefined(propTypes) || _.isObject(propTypes));

    const actionCreator = (rawPayload) => {

        assert(_.isUndefined(rawPayload) || _.isObject(rawPayload));

        const payload = makePayload({ rawPayload, propTypes });

        return makeAction({ type, payload });
    };

    actionCreator.TYPE = type;

    return actionCreator;
};
const makeExtendedActionCreator = ({ type, propTypes, propTransform, after }) => {

    assert(isSimpleActionType(type));
    assert(_.isUndefined(propTypes) || _.isObject(propTypes));
    assert(_.isUndefined(propTransform) || _.isFunction(propTransform));
    assert(_.isUndefined(after) || isAfter(after));

    const actionCreator = (rawPayload) => {

        assert(_.isUndefined(rawPayload) || _.isObject(rawPayload));

        return (dispatch, getState) => {

            const payload = makePayload({ rawPayload, propTypes, propTransform, getState });

            const dispatchResult = dispatch(makeAction({ type, payload }));

            return processAfter({

                after, type, payload, dispatch, getState

            }).then(_.constant(dispatchResult));
        };
    };

    actionCreator.TYPE = type;

    return actionCreator;
};
const makeAsyncActionCreator = (
    { type, requestPropTypes, resultPropTypes, requestPropTransform, resultPropTransform , async, after }) => {

    assert(isAsyncActionType(type));
    assert(_.isUndefined(requestPropTypes) || _.isObject(requestPropTypes));
    assert(_.isUndefined(resultPropTypes) || _.isObject(resultPropTypes));
    assert(_.isUndefined(requestPropTransform) || _.isFunction(requestPropTransform));
    assert(_.isUndefined(resultPropTransform ) || _.isFunction(resultPropTransform ));
    assert(_.isFunction(async));
    assert(_.isUndefined(after) || isAfter(after));

    const actionCreator = (rawRequest) => {

        assert(_.isUndefined(rawRequest) || _.isObject(rawRequest));

        return (dispatch, getState) => {

            const request = makePayload({
                rawPayload: rawRequest,
                propTypes: requestPropTypes,
                propTransform: requestPropTransform,
                getState
            });

            dispatch(actionCreator.request(request));

            return Promise.resolve(

                async(request, { dispatch, getState })

            ).then(
                (rawResult) => {

                    const result = makePayload({
                        rawPayload: rawResult,
                        propTypes: resultPropTypes,
                        propTransform: resultPropTransform,
                        getState
                    });

                    const dispatchResult = dispatch(actionCreator.success({ request, result }));

                    return processAfter({

                        after, type, payload: { request, result }, dispatch, getState

                    }).then(_.constant(dispatchResult));
                },
                (error) => {

                    dispatch(actionCreator.failure({ request, error }));

                    return undefined;
                }
            );
        };
    };

    actionCreator.request = makeRequestActionCreator({ type: type.REQUEST, requestPropTypes });
    actionCreator.success = makeSuccessActionCreator({ type: type.SUCCESS, requestPropTypes, resultPropTypes });
    actionCreator.failure = makeFailureActionCreator({ type: type.FAILURE, requestPropTypes });

    return actionCreator;
};

const makeRequestActionCreator = ({ type, requestPropTypes }) => {

    assert(_.isString(type));
    assert(_.isUndefined(requestPropTypes) || _.isObject(requestPropTypes));

    return makeBasicActionCreator({
        type,
        propTypes: requestPropTypes
    });
};
const makeSuccessActionCreator = ({ type, requestPropTypes, resultPropTypes }) => {

    assert(_.isString(type));
    assert(_.isUndefined(requestPropTypes) || _.isObject(requestPropTypes));
    assert(_.isUndefined(resultPropTypes) || _.isObject(resultPropTypes));

    const actionCreator = ({ request, result } = {}) => {

        assert(_.isUndefined(request) || _.isObject(request));
        assert(_.isUndefined(result) || _.isObject(result));

        const action = { type, payload: {} };

        if (request) {
            action.payload.request = filterProperties(request , requestPropTypes);
        }
        if (result) {
            action.payload.result = filterProperties(result , resultPropTypes);
        }
        if (!action.payload.request && !action.payload.result) {
            delete action.payload;
        }

        return action;
    };

    actionCreator.TYPE = type;

    return actionCreator;
};
const makeFailureActionCreator = ({ type, requestPropTypes }) => {

    assert(_.isString(type));
    assert(_.isUndefined(requestPropTypes) || _.isObject(requestPropTypes));

    const actionCreator = ({ request, error } = {}) => {

        assert(_.isUndefined(request) || _.isObject(request));
        assert(_.isUndefined(error) || _.isObject(error));

        const action = { type, payload: {}, error: true };

        if (request) {
            action.payload.request = filterProperties(request , requestPropTypes);
        }
        if (error) {
            action.payload.error = error;
        }
        if (!action.payload.request && !action.payload.error) {
            delete action.payload;
        }

        return action;
    };

    actionCreator.TYPE = type;

    return actionCreator;
};

const makeAction = ({ type, payload }) => {

    assert(isSimpleActionType(type));
    assert(_.isUndefined(payload) || _.isObject(payload));

    const action = { type };

    if (payload) {
        action.payload = payload;
    }
    if (isErrorActionType(type)) {
        action.error = true;
    }

    return action;
};
const makePayload = ({ rawPayload, propTypes, propTransform, getState }) => {

    assert(_.isUndefined(rawPayload) || _.isObject(rawPayload));
    assert(_.isUndefined(propTypes) || _.isObject(propTypes));
    assert(_.isUndefined(propTransform) || _.isFunction(propTransform));
    assert(_.isUndefined(getState) || _.isFunction(getState));

    if (isDefined(propTransform)) {
        assert(isDefined(getState));
    }

    const transformedPayload = propTransform ? propTransform(rawPayload, { state: getState() }) : rawPayload;

    return filterProperties(transformedPayload, propTypes);
};

const processAfter = ({ after, dispatch, type, payload, getState }) => {

    if (!after) {
        return Promise.resolve();
    }

    return Promise.resolve(
    ).then(() => {

        return makeAfterAction({ after, payload, dispatch, getState });

    }).then((afterAction) => {

        if (afterAction) {
            return dispatch(afterAction);
        }

    }).catch((error) => {

        safeThrow(new AfterActionError({
            message:'Unhandled promise rejection while executing after action.',
            action: { type, payload },
            origin: error
        }));
    });
};
const makeAfterAction = ({ after, payload, dispatch, getState }) => {

    assert(isAfter(after));

    return Promise.resolve(
        _.isFunction(after) ? after({ payload, dispatch, getState, state: getState() }) : after
    );
};

const filterProperties = (props, propTypes) => {

    assert(_.isUndefined(props) || _.isObject(props));
    assert(_.isUndefined(propTypes) || _.isObject(propTypes));

    if (!props || _.isEmpty(props)) {
        return undefined;
    }
    if (!propTypes) {
        return props;
    }

    const result = Object.keys(propTypes).reduce((collector, propType) => {

        if (isDefined(props[propType])) {
            collector[propType] = props[propType];
        }

        return collector;
    }, {});

    return _.isEmpty(result) ? undefined : result;
};

const isDefined = (value) => !_.isUndefined(value);
const isAfter = (value) => _.isObject(value) || _.isFunction(value);
const isActionType = (value) => isSimpleActionType(value) || isAsyncActionType(value);
const isAsyncActionType = (value) => _.isObject(value) && value.REQUEST && value.SUCCESS && value.FAILURE;
const isSimpleActionType = (value) => _.isString(value);

const AfterActionError = class extends ExtendableError {

    constructor({ message, action, origin }) {

        super(message);
        this.action = action;
        this.origin = origin;
    }
};
module.exports = {
    makeActionCreator: makeActionCreator_ROOT, AfterActionError
};
