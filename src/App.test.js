const React = require('react');
const Testing = require('@testing-library/react');
const M = require('./middle-end');
const App = require('./App');

it('renders without crashing.', () => {

    M.initialize();

    const { getByText } = Testing.render(<App
        store={M.store}
        history={M.mods.router.history}
    />);

    expect(getByText('Strangeluv')).toBeDefined();
});
