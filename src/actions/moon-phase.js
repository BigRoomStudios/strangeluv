const Axios = require('axios');
const { makeActionCreator } = require('utils/redux-helpers');
const { MOON_PHASE: Types } = require('action-types');

const actions = exports;

actions.load = makeActionCreator(
    Types.MOON_LOAD,
    {}, // No schema needed, as no args are passed
    {
        async: () => {

            // We'll want to lookup the moon phase for this very millisecond
            const now = Date.now();

            return new Promise((resolve, reject) => {

                // Make a request to the Farmsense API
                const getMoonPhase = Axios.get(`http://api.farmsense.net/v1/moonphases/?d=${now}`);

                // NOTE We don't just return the api call here because we want to mutate the result

                getMoonPhase.then((response) => {

                    // Format of response from Farmsense API looks like [{ ... }]
                    const result = response.data[0];

                    // Bad result
                    if (!result || result.Error) {
                        return reject(result);
                    }

                    // Looks good!
                    return resolve(result);
                })
                .catch((err) => {

                    return reject(err);
                });

                // Pass-through the promise for testing purposes
                return getMoonPhase;
            });
        }
    }
);
