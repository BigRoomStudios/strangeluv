const { useMiddleEnd } = require('strange-middle-end');
const ResetPasswordPage = require('../components/ResetPasswordPage');
const GetQueryParams = require('../../../utils/get-query-params');

module.exports = function ResetPasswordPageContainer(props) {

    const m = useMiddleEnd();

    const { user: userHash, token: forgotPasswordToken } = GetQueryParams();

    const onPressResetPassword = (accountInfo) => m.dispatch.auth.resetPassword({ userHash, forgotPasswordToken, ...accountInfo });

    return (<ResetPasswordPage {...props} onPressResetPassword={onPressResetPassword} />);
};
