const Reducers = require('store/reducers');

module.exports = (store) => ({
    path: 'counter',
    getComponent(location, cb) { // async

        // code-split-point (laziness)
        require.ensure([], (require) => {

            const Counter = require('./containers/CounterContainer');
            const reducer = require('./reducers/Counter');

            // add reducer late
            Reducers.inject(store, { key: 'counter', reducer });

            cb(null, Counter);
        },
        'counter'); // webpack name
    }
});
