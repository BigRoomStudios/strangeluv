const { useState } = require('react');
const { useMiddleEnd } = require('strange-middle-end');
const { useSnackbar } = require('../../../hooks/use-snackbar');
const LoginPage = require('../components/LoginPage');

module.exports = function LoginPageContainer(props) {

    const m = useMiddleEnd();
    const [openSnackbar] = useSnackbar();

    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const onPressLogin = async (accountInfo) => {

        setIsAuthenticating(true);
        const [err] = await m.dispatch.auth.login(accountInfo);
        setIsAuthenticating(false);

        if (!err) {
            // Login and redirect
            m.dispatch.router.push('/exclusive');
        }
        else {
            openSnackbar('An error occurred', { severity: 'error' });
        }
    };

    return <LoginPage
        {...props}
        onPressLogin={onPressLogin}
        isAuthenticating={isAuthenticating}
    />;
};
