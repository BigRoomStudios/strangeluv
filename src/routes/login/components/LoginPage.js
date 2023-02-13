const { useState } = require('react');
const T = require('prop-types');
const { NavLink } = require('react-router-dom');
const { useMiddleEnd } = require('strange-middle-end');
const { default: Styled } = require('styled-components');
const { default: Typography } = require('@mui/material/Typography');
const { default: TextField } = require('@mui/material/TextField');
const { default: Button } = require('@mui/material/Button');
const { default: Box } = require('@mui/material/Box');

const internals = {};

module.exports = function LoginPage({ onPressLogin, isAuthenticated }) {

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const m = useMiddleEnd();

    const disableSubmit = () => {

        return !password || !email;
    };

    const handleSubmit = async (ev) => {

        ev.preventDefault();
        const accountInfo = formatFields();
        setIsSubmitting(true);
        const [err] = await onPressLogin(accountInfo);
        setIsSubmitting(false);

        if (!err) {
            // Login and redirect
            m.dispatch.router.push('/exclusive');
        }
    };

    const formatFields = () => {

        return {
            username: email,
            password
        };
    };

    const { PageContainer, StyledForm } = internals;

    return (
        <PageContainer>
            <Typography variant='h4' align='center' gutterBottom>Log In</Typography>
            <StyledForm onSubmit={handleSubmit}>
                <TextField
                    required
                    type='email'
                    label='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Box>
                    <TextField
                        required
                        type='password'
                        label='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Typography variant='body2' gutterBottom><NavLink to='/forgot-password'>Forgot password?</NavLink></Typography>
                </Box>
                <Box>
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        fullWidth
                        disabled={disableSubmit() || isSubmitting}
                    >
                        Log In
                    </Button>
                </Box>
                <Typography variant='body2'>Don't have an account? <NavLink to='/join'>Sign up</NavLink></Typography>
            </StyledForm>
        </PageContainer>
    );
};

module.exports.propTypes = {
    onPressLogin: T.func.isRequired,
    isAuthenticated: T.bool.isRequired
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
