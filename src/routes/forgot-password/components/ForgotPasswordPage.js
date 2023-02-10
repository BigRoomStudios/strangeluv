const { useState } = require('react');
const T = require('prop-types');
const { default: Styled } = require('styled-components');
const { default: Typography } = require('@mui/material/Typography');
const { default: TextField } = require('@mui/material/TextField');
const { default: Button } = require('@mui/material/Button');
const { default: Box } = require('@mui/material/Box');

const internals = {};

module.exports = function ForgotPasswordPage({ onPressForgotPassword }) {

    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didEmailSend, setDidEmailSend] = useState(false);

    const isSubmitDisabled = !email || isSubmitting;

    const handleSubmit = async (ev) => {

        ev.preventDefault();
        const accountInfo = formatFields();
        setIsSubmitting(true);
        const [err] = await onPressForgotPassword(accountInfo);
        setIsSubmitting(false);
        if (!err) {
            setDidEmailSend(true);
        }
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
                        disabled={disableSubmit() || isSubmitting}
                    >
                        SEND PASSWORD RESET EMAIL
                    </Button>
                    {didEmailSend && <Typography variant='body2'>Email sent!</Typography>}
                </Box>
            </StyledForm>
        </PageContainer>
    );
};

module.exports.propTypes = {
    onPressForgotPassword: T.func.isRequired
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
