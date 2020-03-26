exports.createAppSandbox = () => {

    const sandbox = {};

    jest.isolateModules(() => {
        // Because the middle-end is a singleton, we need to sandbox these require calls.
        sandbox.M = require('./middle-end').initialize();
        sandbox.App = require('./App');
        // Lazy-loaded pages need to be mocked now if the tests will navigate to them.
        sandbox.CounterPage = require('./routes/counter/containers/CounterPage');
        jest.doMock('./routes/counter/containers/CounterPage', () => sandbox.CounterPage);
    });

    return sandbox;
};
