const React = require('react');
const T = require('prop-types');
const Header = require('../../components/Header');
const Classes = require('./styles.scss');

const MuiThemeProvider = require('material-ui/styles').MuiThemeProvider;
const MuiTheme = require('styles/theme');

// Pull global styles
require('../../styles/core.scss');

const CoreLayout = ({ children }) => (

    <MuiThemeProvider theme={MuiTheme}>
        <div className='container text-center'>
            <Header />
            <div className={Classes.mainContainer}>
                {children}
            </div>
        </div>
    </MuiThemeProvider>
);

CoreLayout.propTypes = {
    children: T.element.isRequired
};

module.exports = CoreLayout;
