exports.run = (store) => {

    const initializers = [
        //require('./file-name'),
    ];

    initializers.forEach((init) => init(store));
};
