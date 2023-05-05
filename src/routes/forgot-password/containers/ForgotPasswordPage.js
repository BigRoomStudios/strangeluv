const { useState } = require('react');
const { useMiddleEnd } = require('strange-middle-end');
const { useSnackbar } = require('../../../hooks/use-snackbar');
const ForgotPasswordPage = require('../components/ForgotPasswordPage');

module.exports = function ForgotPasswordPageContainer(props) {

    const m = useMiddleEnd();
    const [openSnackbar] = useSnackbar();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onPressForgotPassword = async (accountInfo) => {

        setIsSubmitting(true);
        const [err] = await m.dispatch.auth.forgotPassword(accountInfo);
        setIsSubmitting(false);

        if (!err) {
            openSnackbar('Email sent successfully');
        }
        else {
            openSnackbar('An error occurred', { severity: 'error' });
        }
    };

    return <ForgotPasswordPage
        {...props}
        onPressForgotPassword={onPressForgotPassword}
        isSubmitting={isSubmitting}
    />;
};
