const React = require('react');
const Enzyme = require('enzyme');
const Assert = require('assert');

class Fixture extends React.Component {
    render() {

        return (
            <div>
                <input id='checked' defaultChecked />
                <input id='not' defaultChecked={false} />
            </div>
        );
    }
}

describe('(Framework) Karma Plugins', () => {

    it('Should expose "expect" globally.', () => {

        Assert.ok(expect);
    });

    it('Should expose "should" globally.', () => {

        Assert.ok(should);
    });

    it('Should have chai-as-promised helpers.', () => {

        const pass = new Promise((res) => res('test'));
        const fail = new Promise((res, rej) => rej());

        return Promise.all([
            expect(pass).to.be.fulfilled,
            expect(fail).to.not.be.fulfilled
        ]);
    });

    it('should have chai-enzyme working', () => {

        let wrapper = Enzyme.shallow(<Fixture />);
        expect(wrapper.find('#checked')).to.be.checked();

        wrapper = Enzyme.mount(<Fixture />);
        expect(wrapper.find('#checked')).to.be.checked();

        wrapper = Enzyme.render(<Fixture />);
        expect(wrapper.find('#checked')).to.be.checked();
    });
});
