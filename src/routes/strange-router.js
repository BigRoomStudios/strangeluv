const React = require('react');
const T = require('prop-types');

const { default: MatchPath } = require('react-router-dom/matchPath');
const { default: Router } = require('react-router-dom/Router');
const { default: Switch } = require('react-router-dom/Switch');
const { default: Route } = require('react-router-dom/Route');

// Ensure we're using the exact code for default root match

const { computeMatch } = Router.prototype;

exports.Router = class StrangeRouter extends React.PureComponent {

    static propTypes = {
        history: T.object,
        routes: T.array.isRequired
    }

    constructor() {

        super();
        this._renderRoutes = this.renderRoutes.bind(this);
    }

    renderRoutes(routes) {

        const renderRouteRecursive = (route, i) => {

            let path = route.path;
            if (path[0] !== '/') {
                path = `/${path}`;
            }

            return (
                <Route
                    exact={route.exact}
                    key={i}
                    path={path}
                    strict={route.strict}
                    render={(props) => (

                        <route.component {...props} route={route}>
                            {
                                route.childRoutes &&
                                route.childRoutes.length &&
                                <Switch>
                                    {route.childRoutes.map(renderRouteRecursive)}
                                </Switch>
                            }
                        </route.component>
                    )}
                />
            );
        };

        return (
            <Switch>
                {routes.map(renderRouteRecursive)}
            </Switch>
        );
    }

    render() {

        const { history, routes } = this.props;

        return (
            <Router
                history={history}>
                {this._renderRoutes(routes)}
            </Router>
        );
    }
};

exports.matchRoutes = (routes, pathname, branch = []) => {

    routes.some((route) => {

        const match = route.path
        ? MatchPath(pathname, route)
        : branch.length
        ? branch[branch.length - 1].match // use parent match
        : computeMatch(pathname); // use default "root" match

        if (match) {
            branch.push({ route, match });

            if (route.childRoutes) {
                exports.matchRoutes(route.childRoutes, pathname, branch);
            }
        }

        return match;
    });

    return branch;
};
