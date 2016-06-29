const Axios = require('axios');
const Types = require('../action-types/moon-phase');

const actions = exports;

// Marks the moment we start waiting for the moon phase
actions.beginLoad = () => {

    return {
        type: Types.MOON_LOAD_BEGIN
    };
};

// Marks the moment we've received some good info about the moon phase
actions.loaded = (moon) => {

    return {
        type: Types.MOON_LOADED,
        payload: moon
    };
};

// Marks the moment an error occurred while look-up the moon phase
actions.loadError = (error) => {

    return {
        type: Types.MOON_LOAD_ERROR,
        payload: error
    };
};

// We'll use a thunk to orchestrate the actions (listed above)
// of this asynchronous process of hitting an API
actions.load = () => {

    // We'll want to lookup the moon phase for this very millisecond
    const now = Date.now();

    return (dispatch) => {

        // Indicate to the app that we're beginning to load the moon phase
        dispatch(actions.beginLoad());

        // Make a request to the Farmsense API
        const getMoonPhase = Axios.get(`http://api.farmsense.net/v1/moonphases/?d=${now}`);

        getMoonPhase.then((response) => {

            // Format of response from Farmsense API looks like [{ ... }]
            const result = response.data[0];

            // Bad result
            if (!result || result.Error) {
                return dispatch(actions.loadError(result));
            }

            // Looks good!
            dispatch(actions.loaded(result));
        })
        .catch((err) => {

            // Indicate that an error occurred
            dispatch(actions.loadError(err));
        });

        // Pass-through the promise for testing purposes
        return getMoonPhase;
    };
};
