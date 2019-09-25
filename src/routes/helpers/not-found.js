const React = require('react');
const { Redirect } = require('react-router-dom');

exports.CatchAllRoute = {
    path: '',
    render: ({ location }) => {

        return <Redirect to={{
            ...location,
            state: {
                ...location.state,
                notFound: true
            }
        }} />;
    }
};

exports.withNotFoundPage = (RouteComponent, NotFoundComponent) => {

    return (props) => {

        const { location } = props;

        return location.state && location.state.notFound ?
            <RouteComponent {...props} children={<NotFoundComponent {...props} />} /> :
            <RouteComponent {...props} />;
    };
};
