const React = require('react');
const Header = require('components/Header');
const Classes = require('components/Header/styles.scss');
const NavLink = require('react-router-dom').NavLink;
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
                <NavLink exact to='/' activeClassName={Classes.activeRoute}>
                    Home
                </NavLink>
            )).to.be.true;
        });

        it('Should render a Link to Counter route', () => {

            expect(_wrapper.contains(
                <NavLink to='/counter' activeClassName={Classes.activeRoute}>
                    Counter
                </NavLink>
            )).to.be.true;
        });
    });
});
