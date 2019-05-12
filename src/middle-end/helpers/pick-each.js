
// { auth: { selectors: { x } }, router: {} } -> { auth: { x } }
module.exports = (obj, key) => {

    return Object.entries(obj).reduce((collect, [name, val]) => {

        if (!val[key]) {
            return collect;
        }

        return {
            ...collect,
            [name]: val[key]
        };
    }, {});
};
