const React = require('react');
const Header = require('components/Header');

// Styles

const gStyles = require('styles'); // global styles
const lStyles = require('./styles'); // local styles

const { CenteredContainer } = gStyles;
const { MainContainer } = lStyles;

// Component

const CoreLayout = ({ children }) => (

    <CenteredContainer>
        <Header />
        <MainContainer>
            {children}
        </MainContainer>
    </CenteredContainer>
);

CoreLayout.propTypes = {
    children: React.PropTypes.element.isRequired
};

module.exports = CoreLayout;
