const React = require('react');
// const TestUtils = require('react-addons-test-utils');
// const TestUtils = require('react-dom/test-utils');
const ShallowRenderer = require('react-test-renderer/shallow');
const CoreLayout = require('layouts/CoreLayout');

const shallowRender = (component) => {

    // const renderer = TestUtils.createRenderer();
    const renderer = new ShallowRenderer();

    renderer.render(component);
    return renderer.getRenderOutput();
};

const shallowRenderWithProps = (props = {}) => {

    return shallowRender(<CoreLayout {...props} />);
};

describe('(Layout) Core', () => {

    let _component;
    let _props;
    let _child;

    beforeEach(() => {

        _child = <h1 className='child'>Child</h1>;
        _props = {
            children: _child
        };

        _component = shallowRenderWithProps(_props);
    });

    it('Should render as a <div>.', () => {

        expect(_component.type).to.equal('div');
    });
});
