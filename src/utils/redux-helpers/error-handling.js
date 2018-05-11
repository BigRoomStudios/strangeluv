const makeErrorHandler = ({ onError }) => ({ dispatch, getState }) => (next) => (action) => { // eslint-disable-line hapi/no-arrowception, hapi/hapi-scope-start

    const result = next(action);

    if (action && action.error) {

        const notificationAction = onError({ payload: { action }, dispatch, getState, state: getState() });

        if (notificationAction) {
            dispatch(notificationAction);
        }
    }

    return result;
};

module.exports = {
    makeErrorHandler
};
