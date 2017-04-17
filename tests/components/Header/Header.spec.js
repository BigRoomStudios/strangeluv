const React = require('react');
const Header = require('components/Header');
const Classes = require('components/Header/styles.scss');
const ReactRouter = require('react-router');
const Enzyme = require('enzyme');

describe('(Component) Header', () => {

    let _wrapper;

    beforeEach(() => {

        _wrapper = Enzyme.shallow(<Header />);
    });

    it('Renders a welcome message', () => {

        const welcome = _wrapper.find('h1');
        expect(welcome).to.exist;
        expect(welcome.text()).to.match(/Strangeluv/);
    });

    describe('Navigation links...', () => {

        it('Should render a Link to Home route', () => {

            expect(_wrapper.contains(
                <ReactRouter.IndexLink activeClassName={Classes.activeRoute} to='/'>
                    Home
                </ReactRouter.IndexLink>
            )).to.be.true;
        });

        it('Should render a Link to Counter route', () => {

            expect(_wrapper.contains(
                <ReactRouter.Link activeClassName={Classes.activeRoute} to='/counter'>
                    Counter
                </ReactRouter.Link>
            )).to.be.true;
        });
    });
});
