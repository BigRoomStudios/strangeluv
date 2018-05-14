const _ = require('lodash');
const { assert } = require('utils/assert');

const SIMPLE = {

    makeActionType: ({ namespace, name }) => {

        assert(!isErrorActionTypeName(name));

        return namespace ? `${namespace}/${name}` : name;
    }
};
const ASYNC = {

    makeActionType: ({ namespace, name }) => {

        return {
            REQUEST: namespace ? `${namespace}/${name}/REQUEST` : `${name}/REQUEST`,
            SUCCESS: namespace ? `${namespace}/${name}/SUCCESS` : `${name}/SUCCESS`,
            FAILURE: namespace ? `${namespace}/${name}/FAILURE` : `${name}/FAILURE`
        };
    }
};
const ERROR = {

    makeActionType: ({ namespace, name }) => {

        assert(isErrorActionTypeName(name));

        return namespace ? `${namespace}/${name}` : name;
    }
};

const makeActionTypes = (definition) => {

    const makeNode = ({ namespace, name, nodeDefinition }) => {

        if (_.isFunction(nodeDefinition.makeActionType)) {
            return nodeDefinition.makeActionType({ namespace, name });
        }
        if (_.isObject(nodeDefinition)) {
            return makeNodes(namespace ? `${namespace}/${name}` : name, nodeDefinition);
        }

        throw new Error(`Unsupported Action Type: '${nodeDefinition}'`);
    };

    const makeNodes = (namespace, definitionMap) =>

        _.mapValues(definitionMap, (nodeDefinition, name) =>

            makeNode({ namespace, name, nodeDefinition })
        );

    return makeNodes(null, definition);
};

const isErrorActionTypeName = (actionTypeName) => actionTypeName === 'FAILURE' || actionTypeName.endsWith('_FAILURE');

const isErrorActionType = (actionType) => isErrorActionTypeName(_.last(_.split(actionType, '/')));

module.exports = {
    SIMPLE,
    ASYNC,
    ERROR,
    makeActionTypes,
    isErrorActionTypeName,
    isErrorActionType
};
