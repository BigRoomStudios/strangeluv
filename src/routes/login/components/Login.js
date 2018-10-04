const React = require('react');
const T = require('prop-types');
const NavLink = require('react-router-dom').NavLink;
const StrangeForms = require('strange-forms');
const IsEmail = require('utils/is-email');
const { Button, TextField, FormHelperText, FormControlLabel, Checkbox, Divider, Typography } = require('@material-ui/core');
const { FormWrapper, TextWrapper, ButtonWrapper } = require('styles/global-components.js');

module.exports = class Login extends StrangeForms(React.Component) {

    static propTypes = {
        errorMessage: T.string,
        login: T.func.isRequired,
        rememberAct: T.func.isRequired
    };

    constructor(props, context) {

        super(props, context);

        this.state = {
            email: '',
            password: '',
            rememberMe: true,
            isBlurred: {
                email: false
            }
        };

        this.strangeForm({
            fields: ['email', 'password', 'rememberMe'],
            get: (someProps, field) => this.state[field],
            act: (field, value) => this.setState({ [field]: value }),
            getFormValue: {
                rememberMe: this.getCheckedValue.bind(this),
                '*': this.getFormValue.bind(this)
            }
        });

        this.fieldBlurred = this._fieldBlurred.bind(this);
        this.showEmailError = this._showEmailError.bind(this);
        this.showPasswordError = this._showEmailError.bind(this);
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

    _disableButton() {

        const { email, password } = this.state;
        const fieldHasValue = (email && password) !== '';

        if (fieldHasValue && IsEmail(email)) {
            return false;
        }

        return true;
    }

    _submit(ev) {

        const { email, password, rememberMe } = this.state;

        this.props.login({ email, password });
        this.props.rememberAct(rememberMe);

        ev.preventDefault();
    }

    render() {

        return (

            <FormWrapper>
                <form onSubmit={this.submit}>
                    <TextWrapper>
                        <Typography variant='headline' gutterBottom>Log In</Typography>
                        {this.props.errorMessage &&
                            <FormHelperText>Oops, something went wrong! {this.props.errorMessage}</FormHelperText>
                        }
                        <TextField
                            id='email'
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
                            variant='outlined'
                            label='Password'
                            margin='normal'
                            fullWidth
                            type='password'
                            value={this.fieldValue('password')}
                            onChange={this.proposeNew('password')}
                        />
                    </TextWrapper>
                    <ButtonWrapper>
                        <Button
                            variant='contained'
                            type='submit'
                            onClick={this.submit}
                            disabled={this.disableButton()}
                            color='primary'
                            size='large'
                        >Log In</Button>
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
                        component={(props) => <NavLink to='/sign-up' {...props} />}
                    >
                        Create an account
                    </Button>
                </form>
            </FormWrapper>
        );
    }
};
