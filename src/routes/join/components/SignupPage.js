const { useState } = require('react');
const T = require('prop-types');
const { default: Styled } = require('styled-components');
const { default: Typography } = require('@mui/material/Typography');
const { default: TextField } = require('@mui/material/TextField');
const { default: Button } = require('@mui/material/Button');
const { default: Box } = require('@mui/material/Box');
const { NavLink } = require('react-router-dom');
const { default: FormControl } = require('@mui/material/FormControl');
const { default: InputLabel } = require('@mui/material/InputLabel');
const { default: Input } = require('@mui/material/Input');
const { default: InputAdornment } = require('@mui/material/InputAdornment');
const { default: IconButton } = require('@mui/material/IconButton');
const { default: Visibility } = require('@mui/icons-material/Visibility');
const { default: VisibilityOff } = require('@mui/icons-material/VisibilityOff');

const internals = {};

module.exports = function SignupPage({ reqCreateAccount }) {

    const handleClickShowPassword = (ev) => {

        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (ev) => {

        ev.preventDefault();
    };

    const disableSubmit = () => {

        return !firstName || !lastName || !email || !password;
    };

    const handleSubmit = async (ev) => {

        ev.preventDefault();
        const accountInfo = formatFields();
        setIsSubmitting(true);
        const [err] = await this.props.reqCreateAccount(accountInfo);
        setIsSubmitting(false);
        if (!err) {
            // Login and redirect
        }
    };

    const formatFields = () => {

        return {
            firstName: this.fieldValue('firstName'),
            lastName: this.fieldValue('lastName'),
            email: this.fieldValue('email'),
            password: this.fieldValue('password'),
            role: 'user'
        };
    };


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { PageContainer, StyledForm } = internals;

    return (
        <PageContainer>
            <Typography variant='h4' align='center' gutterBottom>Sign Up</Typography>
            <StyledForm onSubmit={handleSubmit}>
                <TextField
                    required
                    type='text'
                    label='First Name'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                    required
                    type='text'
                    label='Last Name'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                    required
                    type='email'
                    label='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    required
                    type={showPassword ? 'text' : 'password'}
                    label='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton
                                    aria-label='toggle password visibility'
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
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
                        Sign Up
                    </Button>
                    <Typography variant='body2'>Have an account? <NavLink to='/login'>Log In</NavLink></Typography>
                </Box>
            </StyledForm>
        </PageContainer>
    );
};

module.exports.propTypes = {
    reqCreateAccount: T.func.isRequired
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
