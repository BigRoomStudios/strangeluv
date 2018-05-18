const React = require('react');
const T = require('prop-types');

const <%= pascalEntityName %> = ({ children }) => (

    <div className='<%= snakeEntityName %>-layout'>
        {children}
    </div>

);

<%= pascalEntityName %>.propTypes = {
    children: T.element
};

module.exports = <%= pascalEntityName %>;
