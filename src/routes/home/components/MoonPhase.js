const React = require('react');
const T = require('prop-types');

const internals = {};

const MoonPhase = ({ moonId }) => (
    // All we need to do is display an image
    // of the moon phase, otherwise a placeholder
    <img src={internals.src(moonId)} style={internals.style} />
);

// Make sure we don't get any weird moonIds
MoonPhase.propTypes = {
    moonId: T.number
};

module.exports = MoonPhase;

internals.style = {
    maxWidth: '100px'
};

internals.src = (moonId) => {

    // If no moonId, show a placeholder image
    if (!moonId && moonId !== 0) {
        return 'http://images.zap2it.com/assets/p406044_b_h3_aa/if-we-had-no-moon.jpg';
    }

    // If we do have a good moonId, show what the moon phase looks like
    return `http://www.farmsense.net/demos/images/moonphases/${moonId}.png`;
};
