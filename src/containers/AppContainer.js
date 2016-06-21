const React = require('react');
const Router = require('react-router').Router;
const Provider = require('react-redux').Provider;

module.exports = class extends React.Component {

  static propTypes = {
    history: React.PropTypes.object.isRequired,
    routes: React.PropTypes.object.isRequired,
    routerKey: React.PropTypes.number,
    store: React.PropTypes.object.isRequired
  }

  render() {

    const { history, routes, routerKey, store } = this.props;

    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <Router history={history} children={routes} key={routerKey} />
        </div>
      </Provider>
    );
  }

};
