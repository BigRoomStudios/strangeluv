const React = require('react');

module.exports = () => {

    return <>
        <h3>Oops! Something went wrong.</h3>
        <h4>
            You can keep browsing or try <a href='' onClick={window.location.reload}>
                reloading the page
            </a>.
        </h4>
    </>;
};
