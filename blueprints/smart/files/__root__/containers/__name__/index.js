const Connect = require('react-redux').connect;
const <%= pascalEntityName %> = require('components/<%= pascalEntityName %>');

const internals = {};

// What state and actions do we want to hook-up?
internals.connect = Connect(
    (state) => ({/* map state */}),
    {/* map dispatch */}
);

// Hook them up
module.exports = internals.connect(<%= pascalEntityName %>);
