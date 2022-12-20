const { useState } = require('react');
const T = require('prop-types');
const { default: Styled } = require('styled-components');
const { default: Typography } = require('@mui/material/Typography');
const { default: TextField } = require('@mui/material/TextField');
const { default: Button } = require('@mui/material/Button');
const { default: Box } = require('@mui/material/Box');

const internals = {};

module.exports = function ResetPasswordPage({ onPressResetPassword }) {

    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const disableSubmit = () => {

        return !password || isSubmitting;
    };

    const handleSubmit = async (ev) => {

        ev.preventDefault();
        const accountInfo = formatFields();
        setIsSubmitting(true);
        const [err] = await onPressResetPassword(accountInfo);
        setIsSubmitting(false);
        if (!err) {
            window.location.href = '/login';
        }
    };

    const formatFields = () => {

        return {
            newPassword: password
        };
    };

    const { PageContainer, StyledForm } = internals;

    return (
        <PageContainer>
            <Typography variant='h4' align='center' gutterBottom>Reset Password</Typography>
            <StyledForm onSubmit={handleSubmit}>
                <TextField
                    required
                    type='password'
                    label='New Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Box
                    my={2}
                >
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        fullWidth
                        disabled={disableSubmit()}
                    >
                        Change Password
                    </Button>
                </Box>
            </StyledForm>
        </PageContainer>
    );
};

module.exports.propTypes = {
    onPressResetPassword: T.func.isRequired
};

internals.StyledForm = Styled.form`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(2)};
`;

internals.PageContainer = Styled.div`
    align-self: center;
    margin: auto;
`;
