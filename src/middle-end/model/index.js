exports.actions = require('./actions');
exports.schema = require('./schema');
exports.reducer = require('./reducer').make(exports.schema);
