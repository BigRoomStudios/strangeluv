const React = require('react');
const PropTypes = require('prop-types');

const <%= pascalEntityName %> = ({ children }) => (

    <div className='<%= snakeEntityName %>-layout'>
        {children}
    </div>

);

<%= pascalEntityName %>.propTypes = {
    children: PropTypes.element
};

module.exports = <%= pascalEntityName %>;
