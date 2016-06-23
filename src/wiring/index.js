const Wires = require('./wires');

module.exports  = new Wires(require.context('../', true, /\.js$/));
