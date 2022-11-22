const CheckLocalStorage = require('./check-local-storage');

const internals = { storage: {} };

module.exports = CheckLocalStorage() ? window.localStorage : {
    getItem: (key) => {

        return internals.storage[key] ?? null;
    },
    setItem: (key, value) => {

        internals.storage[key] = String(value);
    },
    removeItem: (key) => {

        delete internals.storage[key];
    },
    clear: () => {

        internals.storage = {};
    }
};
