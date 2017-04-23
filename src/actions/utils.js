const WebClient = require('../utils/web-client');
const utils = {} = exports;

utils.webRequest = (beginRequest, requestError, requestSuccess) => {

    return (method, url, data, cb) => {

        method = method.toLowerCase();

        if (method === 'get' && data) {
            if (!data.params) {
                throw new Error('Must provide `{ params: { myParam: 1 } }` if passing data to `get` requests');
            }
        }

        // For get requests, data must be:
        // `{ params: { myParam: 1 } }`

        // For posts and methods that require a payload:
        // data is just the payload

        if (typeof data === 'function') {
            cb = data;
            data = undefined;
        }

        return (dispatch) => {

            dispatch(beginRequest());

            const request = WebClient[method](url, data);

            request.then((response) => {

                if (!response || response.Error) {
                    return dispatch(requestError(response));
                }

                // Looks good!
                dispatch(requestSuccess(response));
            })
            .catch((err) => {

                // Indicate that an error occurred
                console.log(err);
                dispatch(requestError(err));
            });

            // Pass-through the promise for testing purposes
            return request;
        };
    };
};
