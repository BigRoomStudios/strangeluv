const { useMiddleEnd } = require('strange-middle-end');
const SignupPage = require('../components/SignupPage');

module.exports = function SignupPageContainer(props) {

    const m = useMiddleEnd();

    const reqCreateAccount = (accountInfo) => m.dispatch.auth.register(accountInfo);

    return (<SignupPage {...props} reqCreateAccount={reqCreateAccount} />);
};
