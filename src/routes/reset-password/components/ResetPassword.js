const React = require('react');
const T = require('prop-types');
const StrangeForms = require('strange-forms');
const IsEmail = require('utils/is-email');
const { FormWrapper, TextWrapper } = require('styles/global-components.js');
const { Button, TextField, FormHelperText, Typography } = require('@material-ui/core');

module.exports = class ResetPassword extends StrangeForms(React.Component) {

    static propTypes = {
        resetPassword: T.func.isRequired,
        match: T.object,
        errorMessage: T.string
    };

    constructor(props) {

        super(props);

        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            isBlurred: {
                email: false,
                confirmPassword: false
            }
        };

        this.strangeForm({
            fields: ['email', 'password', 'confirmPassword'],
            get: (someProps, field) => this.state[field],
            act: (field, value) => this.setState({ [field]: value })
        });

        this.fieldBlurred = this._fieldBlurred.bind(this);
        this.showEmailError = this._showEmailError.bind(this);
        this.showPasswordError = this._showPasswordError.bind(this);
        this.disableButton = this._disableButton.bind(this);
        this.submit = this._submit.bind(this);
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

        return this.state.isBlurred.confirmPassword && this.state.password !== this.state.confirmPassword;
    }

    _disableButton() {

        const { email, password, confirmPassword } = this.state;
        const fieldHasValue = (email && password) !== '';
        const passwordsMatch = password === confirmPassword;

        if (fieldHasValue && IsEmail(email) && passwordsMatch) {
            return false;
        }

        return true;
    }

    _submit(ev) {

        const { email, password } = this.state;
        const resetToken = this.props.match.params.token;

        this.props.resetPassword(email, password, resetToken);

        ev.preventDefault();
    }

    render() {

        return (
            <FormWrapper>
                <form onSubmit={this.submit}>
                    <TextWrapper>
                        <Typography variant='headline' gutterBottom>Reset Password</Typography>
                        <Typography>Please confirm your email address and set your new password below.</Typography>
                        {this.props.errorMessage &&
                            <FormHelperText>Error: {this.props.errorMessage}</FormHelperText>
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
                    <Button
                        variant='contained'
                        type='submit'
                        onClick={this.submit}
                        disabled={this.disableButton()}
                        color='primary'
                        size='large'
                    >Update Password</Button>
                </form>
            </FormWrapper>
        );
    }
};
