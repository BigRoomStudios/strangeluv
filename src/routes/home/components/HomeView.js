const React = require('react');
const T = require('prop-types');
const DuckImage = require('../assets/duck.jpg');
const Classes = require('./HomeView.scss');
const MoonPhase = require('./MoonPhase');

module.exports = class extends React.Component {

    static propTypes = {
        loadMoon: T.func.isRequired,
        moonId: T.number,
        isLoading: T.bool,
        errorMessage: T.string
    }

    // Indicates that the component is going to be rendered onto the page
    componentWillMount() {

        // Intend to load the moon phase only if we don't already have it
        if (!this.props.moonId) {
            this.props.loadMoon();
        }
    }

    render() {

        const { errorMessage, moonId, isLoading } = this.props;

        return (
            <div>
                <h4>Welcome!</h4>
                <img
                    alt='This is a duck, because Redux!'
                    className={Classes.duck}
                    src={DuckImage}
                />

                {/* Show error message if something went awry */}
                {errorMessage &&
                    <div>{errorMessage}</div>}

                {/* Show loader if we're waiting to get the moon phase */}
                {isLoading &&
                    <div>Loading...</div>}

                {/* Display moon phase image or a placeholder based upon the moonId */}
                <MoonPhase moonId={moonId} />
            </div>
        );
    }
};
