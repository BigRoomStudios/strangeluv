module.exports = () => {

    return (
        <>
            <h3>Oops! Something went wrong.</h3>
            <h4>
                You can keep browsing or try{' '}
                <button onClick={() => window.location.reload()}>
                    reloading the page
                </button>.
            </h4>
        </>
    );
};
