const React = require('react');
const Header = require('components/Header');

// Styles

const GStyles = require('styles'); // global styles
const LStyles = require('./styles'); // local styles

const { CenteredContainer } = GStyles;
const { MainContainer } = LStyles;

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
