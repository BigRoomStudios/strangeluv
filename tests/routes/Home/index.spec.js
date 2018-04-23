const HomeRoute = require('routes/home');

describe('(Route) Home', () => {

    let _route;

    beforeEach(() => {

        // _component = HomeRoute.component();
        _route = HomeRoute({});
        console.log(_route);
    });

    it('Should return a route configuration object', () => {

        expect(typeof (_route)).to.equal('object');
    });

    it('Configuration should contain path `/`', () => {

        expect(_route.path).to.equal('/');
    });
});
