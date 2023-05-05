const { useState } = require('react');
const { useMiddleEnd } = require('strange-middle-end');
const { useSnackbar } = require('../../../hooks/use-snackbar');
const ResetPasswordPage = require('../components/ResetPasswordPage');
const GetQueryParams = require('../../../utils/get-query-params');

module.exports = function ResetPasswordPageContainer(props) {

    const m = useMiddleEnd();
    const [openSnackbar] = useSnackbar();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const { user: userHash, token: forgotPasswordToken } = GetQueryParams();

    const onPressResetPassword = async (accountInfo) => {

        setIsSubmitting(true);
        const [err] = await m.dispatch.auth.resetPassword({
            userHash,
            forgotPasswordToken,
            ...accountInfo
        });
        setIsSubmitting(false);

        if (!err) {
            m.dispatch.router.push('/login');
        }
        else {
            openSnackbar('An error occurred', { severity: 'error' });
        }
    };

    return <ResetPasswordPage
        {...props}
        onPressResetPassword={onPressResetPassword}
        isSubmitting={isSubmitting}
    />;
};
