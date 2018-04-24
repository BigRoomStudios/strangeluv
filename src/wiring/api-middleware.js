const internals = {};

internals.createSuccessAction = (moon, callName) => {

    return {
        type: callName + '_SUCCESS',
        payload: moon
    };
};

internals.createErrorAction = (error, callName) => {

    return {
        type: callName + '_FAIL',
        payload: error
    };
};

// adapted from https://redux.js.org/recipes/reducing-boilerplate
module.exports = ({ dispatch, getState }) => {

    return (next) => {

        return (action) => {

            const {
                callName,
                callAPI,
                shouldCallAPI = () => true,
                payload: payloadParams = {}
            } = action;

            if (!callAPI) {
                // Normal action: pass it on
                return next(action);
            }

            if (!shouldCallAPI(getState())) {
                return;
            }

            dispatch({
                type: callName + '_START',
                payload: payloadParams
            });

            return callAPI().then(
                (response) => {

                    // Format of response from Farmsense API looks like [{ ... }]
                    const result = response.data[0];

                    // Bad result
                    if (!result || result.Error) {
                        return dispatch(internals.createErrorAction(result, callName));
                    }

                    // Looks good!
                    dispatch(internals.createSuccessAction(result, callName));
                },
                (error) => {

                    return dispatch(internals.createErrorAction(error, callName));
                }
            );
        };
    };
};
