// const Connect = require('react-redux').connect;
const SignupPage = require('../components/SignupPage');
// const M = require('../../../middle-end');

const internals = {};

const { useMiddleEnd } = require('strange-middle-end');

module.exports = function SignupPageContainer(props) {

    const M = useMiddleEnd();

    const reqCreateAccount = async ( accountInfo ) => {

        const [err, result] = await M.dispatch.auth.register(accountInfo);

        return [err, result];
    };

    return (<SignupPage {...props} reqCreateAccount={reqCreateAccount} />);
};
