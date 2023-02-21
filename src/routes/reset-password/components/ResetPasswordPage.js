const { useState } = require('react');
const T = require('prop-types');
const { default: Styled } = require('styled-components');
const { default: Typography } = require('@mui/material/Typography');
const { default: TextField } = require('@mui/material/TextField');
const { default: Button } = require('@mui/material/Button');
const { default: Box } = require('@mui/material/Box');

const internals = {};

module.exports = function ResetPasswordPage({ onPressResetPassword, isSubmitting }) {

    const [password, setPassword] = useState('');

    const isSubmitDisabled = !password || isSubmitting;

    const handleSubmit = (ev) => {

        ev.preventDefault();
        const accountInfo = formatFields();
        onPressResetPassword(accountInfo);
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
                        disabled={isSubmitDisabled}
                    >
                        Change Password
                    </Button>
                </Box>
            </StyledForm>
        </PageContainer>
    );
};

module.exports.propTypes = {
    onPressResetPassword: T.func.isRequired,
    isSubmitting: T.bool
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
