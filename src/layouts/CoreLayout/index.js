const React = require('react');
const T = require('prop-types');
const Header = require('../../containers/Header');
const Classes = require('./styles.scss');

// Pull global styles
require('../../styles/core.scss');

const CoreLayout = ({ children, location }) => (

    <div className='container text-center'>
        <Header location={location} />
        <div className={Classes.mainContainer}>
            {children}
        </div>
    </div>
);

CoreLayout.propTypes = {
    children: T.element.isRequired,
    location: T.object.isRequired
};

module.exports = CoreLayout;
