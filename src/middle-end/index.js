
const MakeMiddleEnd = require('./make-middle-end');

const M = module.exports = {};

// This is an effect that happens when the module is run.
// The middle-end currently needs some sort of effectful action
// because action files often require the middle-end to use
// a selector for instance. (See middle-end/counter/actions.js)

// But since we need the action file to run to initialize our
// middle-end, and the action file requires the middle-end at
// the top, we have a crazy mutual dependency issue going on!!

// So we need the middle-end to be able to export {} until
// the 'apply' func is finished. After that, when referencing
// M in the actions file, you'll have access to all the other
// selectors and actions. But when you first require it,
// it'll be '{}'


MakeMiddleEnd.apply(M, {
    counter: require('./counter'),
    model: require('./model'),
    router: require('./router')
});
