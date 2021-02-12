require('regenerator-runtime/runtime');

const Testing = require('@testing-library/react');
const App = require('./App');
const M = require('./middle-end');

it('renders without crashing.', () => {

    const middleEnd = M.create().initialize();

    const { getByText } = Testing.render(
        <App
            middleEnd={middleEnd}
            history={middleEnd.mods.router.history}
        />
    );

    expect(getByText('Strangeluv')).toBeDefined();
    expect(getByText('Welcome!')).toBeDefined();
});
