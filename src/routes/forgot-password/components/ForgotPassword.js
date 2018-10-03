const React = require('react');
const T = require('prop-types');
const StrangeForms = require('strange-forms');
const IsEmail = require('utils/is-email');
const { FormWrapper, TextWrapper } = require('styles/global-components.js');
const { Button, TextField, FormHelperText, Typography } = require('@material-ui/core');

module.exports = class ForgotPassword extends StrangeForms(React.Component) {

    static propTypes = {
        requestReset: T.func.isRequired,
        errorMessage: T.string
    };

    constructor(props) {

        super(props);

        this.state = {
            email: '',
            isBlurred: {
                email: false
            }
        };

        this.strangeForm({
            fields: ['email'],
            get: (someProps, field) => this.state[field],
            act: (field, value) => this.setState({ [field]: value }),
            getFormValue: (e) => e.target.value || ''

        });

        this.fieldBlurred = this._fieldBlurred.bind(this);
        this.showEmailError = this._showEmailError.bind(this);
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

    _disableButton() {

        const { email } = this.state;

        return !IsEmail(email);
    }

    _submit(ev) {

        const { email } = this.state;

        this.props.requestReset({ email });

        ev.preventDefault();
    }

    render() {

        return (

            <FormWrapper>
                <form onSubmit={this.submit}>
                    <TextWrapper>
                        <Typography variant='headline' gutterBottom>Forgot your password?</Typography>
                        <Typography variant='body1'>Enter your email below and we will email you a link to reset your password.</Typography>
                        <div>
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
                        </div>
                        {this.props.errorMessage &&
                            <FormHelperText error>Error! {this.props.errorMessage}</FormHelperText>
                        }
                    </TextWrapper>
                    <Button
                        variant='contained'
                        type='submit'
                        onClick={this.submit}
                        disabled={this.disableButton()}
                        color='primary'
                        size='large'
                    >Reset Password</Button>
                </form>
            </FormWrapper>
        );
    }
};
