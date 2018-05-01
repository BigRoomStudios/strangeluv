module.exports = (maybeEmail) => {

    return (/.+@.+\..+/i).test(maybeEmail);
};
