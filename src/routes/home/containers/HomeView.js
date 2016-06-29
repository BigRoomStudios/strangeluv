const Connect = require('react-redux').connect;
const MoonAct = require('actions/moon-phase');
const HomeView = require('../components/HomeView');

const internals = {};

internals.connect = Connect(
    (state) => ({
        moonId: state.moonPhase.moonId,
        isLoading: state.moonPhase.isLoading,
        errorMessage: state.moonPhase.error && 'We had an error finding the moon.'
    }),
    {   // This is that thunk that, when called, orchestrates actions
        // around hitting the Farmsense API to get the moon phase
        loadMoon: MoonAct.load
    }
);

// Connect state/actions specified above to the dumb HomeView component
module.exports = internals.connect(HomeView);
