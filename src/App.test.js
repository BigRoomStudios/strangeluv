require('regenerator-runtime/runtime');

const React = require('react');
const Testing = require('@testing-library/react');
const Helpers = require('./test-helpers');

it('renders without crashing.', () => {

    const { App, M } = Helpers.createAppSandbox();
    const { mods } = M;

    const { getByText } = Testing.render(
        <App
            middleEnd={M}
            history={mods.router.history}
        />
    );

    expect(getByText('Strangeluv')).toBeDefined();
    expect(getByText('Welcome!')).toBeDefined();
});
