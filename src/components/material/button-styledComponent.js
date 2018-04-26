const React = require('react');
const T = require('prop-types');
const Button = require('material-ui/Button').default;
const Styled = require('styled-components').default;
const Link = require('react-router-dom').Link;
const Colors = require('styles/colors');
// https://github.com/mui-org/material-ui/blob/28c1f7ab5d60d757c5fbdb8dd11194b3ca0141d2/docs/src/pages/guides/interoperability.md#styled-components.

const internals = {};

// Just some random color function I found online
internals.randomColor = () => '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1,6);

const SuperCoolButton = Styled(Button)
    .attrs({ // Showing that you can add props via the `.attrs` func
        classes: { label: 'label' }
    })`
    background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
    border-radius: 3px;
    height: 48px;
    padding: 0 30px;

    // Target the root component
    && {
        border: ${(props) => '5px solid ' + props.randomColor};
    }

    box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
    .label {
        color: white;
    }
    :hover {
        background: linear-gradient(45deg, #FE6B8B 30%, ${Colors.yellow} 90%);
    }
`;

const ButtonComponent = (props) => (

    <SuperCoolButton
        // if we don't receive a path, we need to skip this aspect
        component={props.path ? Link : null}
        randomColor={internals.randomColor()}
    >
        {props.title}
    </SuperCoolButton>
);

ButtonComponent.propTypes = {
    title: T.string.isRequired,
    path: T.string
};

module.exports = ButtonComponent;
