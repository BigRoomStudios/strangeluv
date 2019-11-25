const MiddleEnd = require('strange-middle-end');

module.exports = MiddleEnd.createEntityReducer({ shouldIndex: (indexName) => indexName.startsWith('auth/') });
