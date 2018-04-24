const Axios = require('axios');

const actions = exports;

// We'll use a thunk to orchestrate the actions (listed above)
// of this asynchronous process of hitting an API
actions.load = () => {

    // We'll want to lookup the moon phase for this very millisecond
    const now = Date.now();

    return {
        callName: 'MOON_LOAD',
        callAPI: () => Axios.get(`http://api.farmsense.net/v1/moonphases/?d=${now}`)
    };
};
