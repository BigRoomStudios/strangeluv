require('regenerator-runtime/runtime');

const React = require('react');
const Testing = require('@testing-library/react');
const Helpers = require('./test-helpers');

it('renders without crashing.', () => {

    const { App, M } = Helpers.createAppSandbox();
    const { store, mods } = M;

    const { getByText } = Testing.render(
        <App
            store={store}
            history={mods.router.history}
        />
    );

    expect(getByText('Strangeluv')).toBeDefined();
    expect(getByText('Welcome!')).toBeDefined();
});
