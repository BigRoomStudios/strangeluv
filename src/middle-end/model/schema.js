const { schema: { Entity } } = require('normalizr');

// Schema declarations go here

const internals = {};

// Setup relations

Object.values(exports).forEach((entity) => {

    if (!entity.relations || !entity.define) {
        return;
    }

    entity.define(entity.relations(exports));
});

internals.relatedFields = (entity, fields) => {

    const subEntity = { id: entity.id };

    fields.forEach((field) => {

        if (entity.hasOwnProperty(field)) {
            subEntity[field] = entity[field];
        }
    });

    return Object.keys(subEntity).length > 1 ? subEntity : undefined;
};
