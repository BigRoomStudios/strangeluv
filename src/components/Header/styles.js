
const styled = require('styled-components').default;
const Router = require('react-router');

module.exports = {
    StyledLink: styled(Router.IndexLink)`
        color: ${(props) => props.color || 'green'};
        padding: 0 4px;
    `
};
