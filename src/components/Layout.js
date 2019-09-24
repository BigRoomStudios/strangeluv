const React = require('react');
const T = require('prop-types');
const Header = require('./Header');
const { default: Styled } = require('styled-components');

const internals = {};

module.exports = ({ children }) => {

    const { Container } = internals;

    return <div>
        <Header />
        <Container>{children}</Container>
    </div>;
};

module.exports.propTypes = {
    children: T.any
};

internals.Container = Styled.div`
    padding-top:20px;
`;
