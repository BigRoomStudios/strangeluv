const React = require('react');
const Header = require('../../components/Header');
const Classes = require('./CoreLayout.scss');

// Pull global styles
require('../../styles/core.scss');

module.exports = exports = ({ children }) => (
  <div className='container text-center'>
    <Header />
    <div className={Classes.mainContainer}>
      {children}
    </div>
  </div>
);

exports.propTypes = {
  children: React.PropTypes.element.isRequired
};
