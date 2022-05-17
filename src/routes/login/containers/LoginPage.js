// const Connect = require('react-redux').connect;
const LoginPage = require('../components/LoginPage');
// const M = require('../../../middle-end');

const internals = {};

const { useMiddleEnd } = require('strange-middle-end');

module.exports = function LoginPageContainer(props) {

    const M = useMiddleEnd();

    const onPressLogin = async ( accountInfo ) => {

        const [err, result] = await M.dispatch.auth.login(accountInfo);

        return [err, result];
    };

    return (<LoginPage {...props} onPressLogin={onPressLogin} />);
};
