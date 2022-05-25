const { useMiddleEnd } = require('strange-middle-end');
const LoginPage = require('../components/LoginPage');

module.exports = function LoginPageContainer(props) {

    const m = useMiddleEnd();

    const onPressLogin = (accountInfo) => m.dispatch.auth.login(accountInfo);

    return (<LoginPage {...props} onPressLogin={onPressLogin} />);
};
