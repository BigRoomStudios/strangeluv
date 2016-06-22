const React = require('react');

const <%= pascalEntityName %> = ({ children }) => (

    <div className='<%= snakeEntityName %>-layout'>
        {children}
    </div>

);

<%= pascalEntityName %>.propTypes = {
    children: React.PropTypes.element
};

module.exports = <%= pascalEntityName %>;
