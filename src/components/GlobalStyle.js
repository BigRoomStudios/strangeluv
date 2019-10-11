const Styled = require('styled-components');
const NormalizeMixin = require('polished/lib/mixins/normalize');

module.exports = Styled.createGlobalStyle`${NormalizeMixin()}`;
