const internals = {};

module.exports = class Wires {

    constructor(ctx) {

        if (!ctx) {
            throw new Error('Context not provided to the wires.');
        }

        // Webpack context of the app.  Should only be .js files.
        this.ctx = ctx;
        this.files = ctx.keys().map((file) => {
            // Remove ./ and .js
            return file.slice(2, -3);
        });
    }

    // List reducers from reducers/ for use in Redux.combineReducers()
    reducers() {

        if (this._reducersMemo) {
            return this._reducersMemo;
        }

        const syncReducers = this.files.reduce((collector, file) => {

            const match = file.match(internals.regex.reducers);

            if (!match) {
                return collector;
            }

            const name = internals.camelize(match[1]);
            collector[name] = this.get(file);

            return collector;
        }, {});

        this._reducersMemo = syncReducers;
        return syncReducers;
    }

    flushReducers() {

        this._reducersMemo = null;
    }

    get(file) {

        return this.ctx(`./${file}.js`);
    }
};

internals.regex = {
    routes: /(?:routes\/[^\/]+)+/g,
    reducers: /^reducers\/([^\/]+)$/
};

internals.camelize = (name) => {

    // Max-fluxlr -> max-fluxlr
    name = name[0].toLowerCase() + name.slice(1);

    // max-fluxlr -> maxFluxlr
    name = name.replace(/[_-]./g, (m) => m[1].toUpperCase());

    return name;
};
