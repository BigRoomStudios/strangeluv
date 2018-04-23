const HomeRoute = require('routes/home');

describe('(Route) Home', () => {

    it('Should return a route configuration object', () => {

        expect(typeof (HomeRoute)).to.equal('object');
    });

    it('Configuration should contain path `/`', () => {

        expect(HomeRoute.path).to.equal('/');
    });

});
