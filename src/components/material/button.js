const React = require('react');
const T = require('prop-types');
const withStyles = require('material-ui/styles').withStyles;
const Button = require('material-ui/Button').default;
const Link = require('react-router-dom').Link;
// https://material-ui-next.com/customization/css-in-js/#withstyles-styles-options-higher-order-component
// https://github.com/mui-org/material-ui/blob/v1-beta/src/Button/Button.js

const styles = {
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
        '&:hover': {
            background: 'linear-gradient(45deg, #FE6B8B 30%, white 90%)'
        }
    },
    label: {
        textTransform: 'lowercase'
    }
};
const ButtonComponent = (props) => (

    <Button
        // if we don't receive a path, we need to skip this aspect
        component={props.path ? Link : null}
        to={props.path || null}
        classes={{
            root: props.classes.root,
            label: props.classes.label
        }}
    >
        {props.title}
    </Button>
);

ButtonComponent.propTypes = {
    title: T.string.isRequired,
    path: T.string,
    classes: T.object.isRequired
};

module.exports = withStyles(styles)(ButtonComponent);
