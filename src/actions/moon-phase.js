const Axios = require('axios');
const Types = require('../action-types/moon-phase');

const actions = exports;

actions.load = () => {

    const now = Date.now();

    return {
        type: 'MOON_LOAD',
        payload: new Promise((resolve, reject) => {

            Axios.get(`http://api.farmsense.net/v1/moonphases/?d=${now}`).then((response) => {

                // Format of response from Farmsense API looks like [{ ... }]
                const result = response.data[0];

                // Bad result
                if (!result || result.Error) {
                    reject(new Error(response));
                }

                // Looks good!
                resolve(result);
            });
        })
    };
};
