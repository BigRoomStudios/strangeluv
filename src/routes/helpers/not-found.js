const { Component } = require('react');
const T = require('prop-types');
const { Redirect } = require('react-router-dom');

exports.CatchAllRoute = {
    path: '',
    render: class NotFoundCatchAll extends Component {

        static propTypes = {
            location: T.shape({
                state: T.object
            })
        };

        render() {

            const { location } = this.props;

            return (
                <Redirect
                    to={{
                        ...location,
                        state: {
                            ...location.state,
                            notFound: true
                        }
                    }}
                />
            );
        }
    }
};

exports.withNotFoundPage = (RouteComponent, NotFoundComponent) => {

    return class RouteComponentWithNotFoundPage extends Component {

        static propTypes = {
            location: T.shape({
                state: T.shape({
                    notFound: T.bool
                })
            })
        };

        render() {

            const { location } = this.props;

            return location.state && location.state.notFound ?
                <RouteComponent {...this.props} children={<NotFoundComponent {...this.props} />} /> :
                <RouteComponent {...this.props} />;
        }
    };
};
