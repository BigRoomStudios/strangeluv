const React = require('react');
const T = require('prop-types');
const { default: Styled } = require('styled-components');
const { default: Typography } = require('@material-ui/core/Typography');
const { default: TextField } = require('@material-ui/core/TextField');
const { default: Button } = require('@material-ui/core/Button');
const { default: Box } = require('@material-ui/core/Box');
const { default: Link } = require('@material-ui/core/Link');
const { default: FormControl } = require('@material-ui/core/FormControl');
const { default: InputLabel } = require('@material-ui/core/InputLabel');
const { default: Input } = require('@material-ui/core/Input');
const { default: InputAdornment } = require('@material-ui/core/InputAdornment');
const { default: IconButton } = require('@material-ui/core/IconButton');
const { default: Visibility } = require('@material-ui/icons/Visibility');
const { default: VisibilityOff } = require('@material-ui/icons/VisibilityOff');
const StrangeForms = require('strange-forms');

const internals = {};

module.exports = class SignupPage extends StrangeForms(React.Component) {

    static propTypes = {
        reqCreateAccount: T.func.isRequired
    };

    static fields = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    };

    constructor(props) {

        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            showPassword: false,
            isSubmitting: false
        };

        this.strangeForm({
            fields: Object.keys(SignupPage.fields),
            get: (someProps, field) => {

                return someProps.data ? someProps.data[field] : '';
            },
            act: () => null
        });
    }

    handleClickShowPassword = (ev) => {

        this.setState((currentState) => ({
            showPassword: !currentState.showPassword
        }));
    }

    handleMouseDownPassword = (ev) => {

        ev.preventDefault();
    }

    disableSubmit() {

        return false;
    }

    handleSubmit = async (ev) => {

        ev.preventDefault();
        const accountInfo = this.formatFields();
        this.setState({ isSubmitting: true });
        const [err] = await this.props.reqCreateAccount(accountInfo);
        this.setState({ isSubmitting: false });
        if (!err) {
            // Login and redirect
        }
    }

    formatFields = () => {

        return {
            firstName: this.fieldValue('firstName'),
            lastName: this.fieldValue('lastName'),
            email: this.fieldValue('email'),
            password: this.fieldValue('password'),
            role: 'user'
        };
    };

    render() {

        const { isSubmitting, showPassword } = this.state;
        const { PageContainer, StyledForm } = internals;

        return (
            <PageContainer>
                <Typography variant='h4' align='center' gutterBottom>Sign Up</Typography>
                <StyledForm
                    style={{ display: 'flex', flexDirection: 'column' }}
                    onSubmit={this.handleSubmit}
                >
                    <TextField
                        required
                        type='text'
                        label='First Name'
                        value={this.fieldValue('firstName')}
                        onChange={this.proposeNew('firstName')}
                    />
                    <TextField
                        required
                        type='text'
                        label='Last Name'
                        value={this.fieldValue('lastName')}
                        onChange={this.proposeNew('lastName')}
                    />
                    <TextField
                        required
                        type='email'
                        label='Email'
                        value={this.fieldValue('email')}
                        onChange={this.proposeNew('email')}
                    />
                    <FormControl>
                        <InputLabel htmlFor='standard-adornment-password'>Password</InputLabel>
                        <Input
                            required
                            id='standard-adornment-password'
                            type={showPassword ? 'text' : 'password'}
                            value={this.fieldValue('password')}
                            onChange={this.proposeNew('password')}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='toggle password visibility'
                                        onClick={this.handleClickShowPassword}
                                        onMouseDown={this.handleMouseDownPassword}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <Box
                        my={2}
                    >
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            fullWidth
                            disabled={this.disableSubmit() || isSubmitting}
                        >
                            Sign Up
                        </Button>
                        <Typography variant='body2'>Have an account? <Link href='/login'>Log In</Link></Typography>
                    </Box>
                </StyledForm>
            </PageContainer>
        );
    }
};

internals.StyledForm = Styled.form`
    display: flex;
    flex-direction: column;
`;

internals.PageContainer = Styled.div`
    align-self: center;
    margin: auto;
`;
