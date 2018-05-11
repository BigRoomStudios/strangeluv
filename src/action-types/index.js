const { makeActionTypes } = require('utils/redux-helpers');

module.exports = makeActionTypes({
    COUNTER: require('./counter'),
    MOON_PHASE: require('./moon-phase')
});
