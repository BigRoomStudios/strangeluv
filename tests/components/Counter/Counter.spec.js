const React = require('react');
const Redux = require('redux');
const Counter = require('routes/counter/components/Counter');
const Enzyme = require('enzyme');

describe('(Component) Counter', () => {

    let _props;
    let _spies;
    let _wrapper;

    beforeEach(() => {

        _spies = {};
        _props = {
            counter: 5,
            ...Redux.bindActionCreators({
                doubleAsync: (_spies.doubleAsync = sinon.spy()),
                increment: (_spies.increment = sinon.spy())
            }, _spies.dispatch = sinon.spy())
        };
        _wrapper = Enzyme.shallow(<Counter {..._props} />);
    });

    it('Should render as a <div>.', () => {

        expect(_wrapper.is('div')).to.equal(true);
    });

    it('Should render with an <h2> that includes Sample Counter text.', () => {

        expect(_wrapper.find('h2').text()).to.match(/Counter:/);
    });

    it('Should render props.counter at the end of the sample counter <h2>.', () => {

        expect(_wrapper.find('h2').text()).to.match(/5$/);
        _wrapper.setProps({ counter: 8 });
        expect(_wrapper.find('h2').text()).to.match(/8$/);
    });

    it('Should render exactly two buttons.', () => {

        expect(_wrapper).to.have.descendants('.btn');
    });

    //
    describe('An increment button...', () => {

        let _button;

        beforeEach(() => {

            _button = _wrapper.find('button').filterWhere((a) => a.text() === 'Increment');
        });

        it('Should dispatch a `increment` action when clicked', () => {

            _spies.dispatch.should.have.not.been.called;

            _button.simulate('click');

            _spies.dispatch.should.have.been.called;
            _spies.increment.should.have.been.called;
        });
    });

    describe('A Double (Async) button...', () => {

        let _button;

        beforeEach(() => {

            _button = _wrapper.find('button').filterWhere((a) => a.text() === 'Double (Async)');
        });

        it('Should dispatch a `doubleAsync` action when clicked', () => {

            _spies.dispatch.should.have.not.been.called;

            _button.simulate('click');

            _spies.dispatch.should.have.been.called;
            _spies.doubleAsync.should.have.been.called;
        });
    });
});
