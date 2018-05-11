const { SIMPLE, ASYNC, ERROR, makeActionTypes } = require('./action-type-helpers');
const { mergeSelectors } = require('./selector-helpers');
const { makeActionCreator, AfterActionError } = require('./action-creator-helpers');
const { makeErrorHandler } = require('./error-handling');

module.exports = {

    SIMPLE, ASYNC, ERROR, makeActionTypes,
    mergeSelectors,
    makeActionCreator, AfterActionError,
    makeErrorHandler
};
