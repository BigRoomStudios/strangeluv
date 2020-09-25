const React = require('react');

module.exports = () => {

    const handleClick = () => window.location.reload();

    return (
        <>
            <h3>Oops! Something went wrong.</h3>
            <h4>
                You can keep browsing or try{' '}
                <button onClick={handleClick}>
                    reloading the page
                </button>.
            </h4>
        </>
    );
};
