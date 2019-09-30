const React = require('react');
const Testing = require('@testing-library/react');
const MiddleEnd = require('strange-middle-end');
const Config = require('./middle-end/config');
const App = require('./App');

it('renders without crashing.', () => {

    const { store, mods } = MiddleEnd.create(Config).initialize();

    const { getByText } = Testing.render(
        <App
            store={store}
            history={mods.router.history}
        />
    );

    expect(getByText('Strangeluv')).toBeDefined();
});
