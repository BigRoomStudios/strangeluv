const { useMiddleEnd } = require('strange-middle-end');
const ForgotPasswordPage = require('../components/ForgotPasswordPage');

module.exports = function ForgotPasswordPageContainer(props) {

    const m = useMiddleEnd();

    const onPressForgotPassword = (accountInfo) => m.dispatch.auth.forgotPassword(accountInfo);

    return (<ForgotPasswordPage {...props} onPressForgotPassword={onPressForgotPassword} />);
};
