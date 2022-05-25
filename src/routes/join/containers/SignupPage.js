const { useMiddleEnd } = require('strange-middle-end');
const SignupPage = require('../components/SignupPage');

module.exports = function SignupPageContainer(props) {

    const m = useMiddleEnd();

    const reqCreateAccount = async ( accountInfo ) => {

        const [err, result] = await M.dispatch.auth.register(accountInfo);

        return [err, result];
    };

    return (<SignupPage {...props} reqCreateAccount={reqCreateAccount} />);
};
