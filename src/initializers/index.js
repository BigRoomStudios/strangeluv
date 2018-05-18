exports.run = (store) => {

    const initializers = [
        require('./auth')
    ];

    initializers.forEach((init) => init(store));
};
