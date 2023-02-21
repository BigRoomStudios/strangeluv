const { useState } = require('react');
const T = require('prop-types');
const { default: Styled } = require('styled-components');
const { default: Typography } = require('@mui/material/Typography');
const { default: TextField } = require('@mui/material/TextField');
const { default: Button } = require('@mui/material/Button');
const { default: Box } = require('@mui/material/Box');

const internals = {};

module.exports = function ForgotPasswordPage({ onPressForgotPassword, isSubmitting }) {

    const [email, setEmail] = useState('');

    const isSubmitDisabled = !email || isSubmitting;

    const handleSubmit = (ev) => {

        ev.preventDefault();
        const accountInfo = formatFields();
        onPressForgotPassword(accountInfo);
    };

    const formatFields = () => {

        return {
            username: email
        };
    };

    const { PageContainer, StyledForm } = internals;

    return (
        <PageContainer>
            <Typography variant='h4' align='center' gutterBottom>Forgot Password</Typography>
            <StyledForm onSubmit={handleSubmit}>
                <TextField
                    required
                    type='email'
                    label='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                        SEND PASSWORD RESET EMAIL
                    </Button>
                </Box>
            </StyledForm>
        </PageContainer>
    );
};

module.exports.propTypes = {
    onPressForgotPassword: T.func.isRequired,
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
