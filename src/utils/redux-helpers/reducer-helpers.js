// "Optimistic" in the sense that we'll update a value before we know
// it has been confirmed by the pending request.  We hold onto the previous value
// so that we can rollback in case of a failure.
exports.setOptimistic = (state, key, value) => {

    return (deeply, id) => {

        return deeply
        .set([id, key], value)
        .set([id, 'optimistic', key], state[id][key]);
    };
};

// This is the naive strategy to rollback an optimistic update.
// NOTE this wont work perfectly in the case of multiple in-flight
// requests, or requests responding out of order.  It's a limitation/bug
// we'll have to live with until a more robust solution can be put in place.
exports.unsetOptimistic = (state, key) => {

    return (deeply, id) => {

        if (!state[id].optimistic[key]) {
            return deeply;
        }

        return deeply
        .set([id, key], state[id].optimistic[key])
        .del([id, 'optimistic', key]);
    };
};
