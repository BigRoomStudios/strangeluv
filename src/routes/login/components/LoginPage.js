const { useState } = require('react');
const T = require('prop-types');
const { NavLink } = require('react-router-dom');
const { default: Styled } = require('styled-components');
const { default: Typography } = require('@mui/material/Typography');
const { default: TextField } = require('@mui/material/TextField');
const { default: Button } = require('@mui/material/Button');
const { default: Box } = require('@mui/material/Box');

const internals = {};

module.exports = function LoginPage({ onPressLogin, isAuthenticating }) {

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const isSubmitDisabled = !password || !email || isAuthenticating;

    const handleSubmit = (ev) => {

        ev.preventDefault();
        const accountInfo = formatFields();
        onPressLogin(accountInfo);
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
                        disabled={isSubmitDisabled}
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
    onPressLogin: T.func.isRequired
    isAuthenticating: T.bool.isRequired
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
