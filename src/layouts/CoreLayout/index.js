const React = require('react');
const Header = require('../../components/Header');
const Classes = require('./styles.scss');

// Pull global styles
require('../../styles/core.scss');

const CoreLayout = ({ children }) => (

  <div className='container text-center'>
    <Header />
    <div className={Classes.mainContainer}>
      {children}
    </div>
  </div>

);

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
};

module.exports = CoreLayout;
