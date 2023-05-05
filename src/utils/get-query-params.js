const QueryString = require('query-string');

module.exports = () => QueryString.parse(window.location.search);
