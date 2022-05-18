const { useMiddleEnd } = require('strange-middle-end');
const LoginPage = require('../components/LoginPage');

module.exports = function LoginPageContainer(props) {

    const M = useMiddleEnd();

    const onPressLogin = async ( accountInfo ) => {

        const [err, result] = await M.dispatch.auth.login(accountInfo);

        return [err, result];
    };

    return (<LoginPage {...props} onPressLogin={onPressLogin} />);
};
