const Styled = require('styled-components');
const NormalizeMixin = require('polished/lib/mixins/normalize');

module.exports = Styled.createGlobalStyle`
    ${NormalizeMixin()}
    body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }
`;
