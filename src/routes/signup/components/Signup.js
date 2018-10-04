const React = require('react');
const T = require('prop-types');
const NavLink = require('react-router-dom').NavLink;
const StrangeForms = require('strange-forms');
const IsEmail = require('utils/is-email');
const { Button, TextField, FormHelperText, FormControlLabel, Checkbox, Divider, Typography } = require('@material-ui/core');
const { FormWrapper, TextWrapper, ButtonWrapper } = require('styles/global-components.js');


module.exports = class Signup extends StrangeForms(React.Component) {

    static propTypes = {
        onSubmit: T.func.isRequired,
        errorMessage: T.string,
        rememberAct: T.func.isRequired
    };

    constructor(props) {

        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            rememberMe: true,
            isBlurred: {
                email: false,
                confirmPassword: false
            }
        };

        this.strangeForm({
            fields: ['firstName', 'lastName', 'email', 'password', 'confirmPassword', 'rememberMe'],
            get: (someProps, field) => this.state[field],
            act: (field, value) => this.setState({ [field]: value }),
            getFormValue: {
                rememberMe: this.getCheckedValue.bind(this),
                '*': this.getFormValue.bind(this)
            }
        });

        this.fieldBlurred = this._fieldBlurred.bind(this);
        this.showEmailError = this._showEmailError.bind(this);
        this.showPasswordError = this._showPasswordError.bind(this);
        this.disableButton = this._disableButton.bind(this);
        this.submit = this._submit.bind(this);
    }

    getCheckedValue(e) {

        return e.target.checked;
    }

    getFormValue(e) {

        return e.target.value || '';
    }

    _fieldBlurred(ev) {

        const isBlurred = { ...this.state.isBlurred };
        const field = ev.target.id;

        isBlurred[field] = true;

        this.setState({ isBlurred });
    }

    _showEmailError() {

        return (this.state.isBlurred.email) && !IsEmail(this.state.email);
    }

    _showPasswordError() {

        return this.state.isBlurred.confirmPassword && (this.state.password !== this.state.confirmPassword);
    }

    _disableButton() {

        const { firstName, lastName, email, password, confirmPassword } = this.state;
        const fieldHasValue = (firstName && lastName && email && password) !== '';
        const passwordsMatch = password === confirmPassword;

        if (fieldHasValue && IsEmail(email) && passwordsMatch) {
            return false;
        }

        return true;
    }

    _submit(ev) {

        const { firstName, lastName, email, password, rememberMe } = this.state;

        this.props.onSubmit({ email, password, firstName, lastName  });
        this.props.rememberAct(rememberMe);

        ev.preventDefault();
    }

    render() {

        return (

            <FormWrapper>
                <form onSubmit={this.submit}>
                    <TextWrapper>
                        <Typography variant='headline' gutterBottom>Sign Up</Typography>
                        {this.props.errorMessage &&
                            <FormHelperText>Oops, something went wrong! {this.props.errorMessage}</FormHelperText>
                        }
                        <TextField
                            id='firstName'
                            type='text'
                            variant='outlined'
                            label='First Name'
                            margin='normal'
                            fullWidth
                            value={this.fieldValue('firstName')}
                            onChange={this.proposeNew('firstName')}
                            onBlur={this.fieldBlurred}
                        />
                        <TextField
                            id='lastName'
                            type='text'
                            variant='outlined'
                            label='Last Name'
                            margin='normal'
                            fullWidth
                            value={this.fieldValue('lastName')}
                            onChange={this.proposeNew('lastName')}
                            onBlur={this.fieldBlurred}
                        />
                        <TextField
                            id='email'
                            type='email'
                            variant='outlined'
                            label='Email'
                            margin='normal'
                            fullWidth
                            value={this.fieldValue('email')}
                            onChange={this.proposeNew('email')}
                            onBlur={this.fieldBlurred}
                            error={this.showEmailError()}
                        />
                        {this.showEmailError() &&
                            <FormHelperText>
                                Please enter a valid email address.
                            </FormHelperText>
                        }
                        <TextField
                            id='password'
                            type='password'
                            variant='outlined'
                            label='Password'
                            margin='normal'
                            fullWidth
                            value={this.fieldValue('password')}
                            onChange={this.proposeNew('password')}
                        />
                        <TextField
                            id='confirmPassword'
                            type='password'
                            variant='outlined'
                            label='Confirm Password'
                            margin='normal'
                            fullWidth
                            value={this.fieldValue('confirmPassword')}
                            onChange={this.proposeNew('confirmPassword')}
                            onBlur={this.fieldBlurred}
                            error={this.showPasswordError()}
                        />
                        {this.showPasswordError() &&
                            <FormHelperText>
                                Please enter matching passwords.
                            </FormHelperText>
                        }
                    </TextWrapper>
                    <ButtonWrapper>
                        <Button
                            variant='contained'
                            type='submit'
                            onClick={this.submit}
                            disabled={this.disableButton()}
                            color='primary'
                            size='large'
                        >Create Account</Button>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.fieldValue('rememberMe')}
                                    onChange={this.proposeNew('rememberMe')}
                                    color='primary'
                                />
                            }
                            label='Remember Me'
                        />
                    </ButtonWrapper>
                    <TextWrapper>
                        <Divider />
                    </TextWrapper>
                    <Button
                        variant='text'
                        size='small'
                        component={(props) => <NavLink to='/forgot-password' {...props} />}
                    >
                        Forgot password?
                    </Button>
                    <Button
                        variant='text'
                        size='small'
                        component={(props) => <NavLink to='/login' {...props} />}
                    >
                        Log into an existing account
                    </Button>
                </form>
            </FormWrapper>
        );
    }
};
