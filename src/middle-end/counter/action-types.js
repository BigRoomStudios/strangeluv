const MiddleEnd = require('strange-middle-end');

module.exports = MiddleEnd.createTypes('counter', {
    INCREMENT: MiddleEnd.type.simple,
    DOUBLE: MiddleEnd.type.async
});
