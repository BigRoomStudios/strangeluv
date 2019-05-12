const internals = {};

// export some selectors here

internals.loading = ({ model }, index) => {

    const { inFlight = 0 } = model.indexes[index] || {};

    return (inFlight > 0);
};
