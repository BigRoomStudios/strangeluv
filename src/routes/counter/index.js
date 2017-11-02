const Reducers = require('wiring/reducers');

module.exports = (store) => ({
    path: 'counter',
    getComponent(location, cb) { // async

        console.warn('OSDKFIOJSDIFJISDJFISDJF');

        // code-split-point (laziness)
        require.ensure([], (require) => {

            const Counter = require('./containers/Counter');
            const reducer = require('./reducers/counter');

            // add reducer late
            Reducers.inject(store, { key: 'counter', reducer });

            cb(null, Counter);
        },
        'counter'); // webpack name
    }
});
