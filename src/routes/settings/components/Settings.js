const React = require('react');
const T = require('prop-types');
const NavLink = require('react-router-dom').NavLink;
const StrangeForms = require('strange-forms');
const IsEmail = require('utils/is-email');
const { Button, TextField, FormHelperText, Divider, Typography } = require('@material-ui/core');
const { FormWrapper, TextWrapper, ButtonWrapper } = require('styles/global-components.js');


module.exports = class Settings extends StrangeForms(React.Component) {

    static propTypes = {
        onSubmit: T.func.isRequired,
        errorMessage: T.string,
        userDetails: T.shape({
            firstName: T.string.isRequired,
            lastName: T.string.isRequired,
            email: T.string.isRequired
        })
    };

    constructor(props) {

        super(props);

        this.state = {
            firstName: props.userDetails.firstName || '',
            lastName: props.userDetails.lastName || '',
            email: props.userDetails.email || '',
            currentPassword: '',
            password: '',
            confirmPassword: '',
            isBlurred: {
                email: false,
                confirmPassword: false
            }
        };

        this.strangeForm({
            fields: ['firstName', 'lastName', 'email', 'currentPassword', 'password', 'confirmPassword'],
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

        return this.state.isBlurred.confirmPassword && (this.state.password !== this.state.confirmPassword);
    }

    _disableButton() {

        const { firstName, lastName, email, currentPassword, password, confirmPassword } = this.state;
        const fieldHasChanged =
            (firstName !== this.props.userDetails.firstName) ||
            (lastName !== this.props.userDetails.lastName) ||
            (email !== this.props.userDetails.email);
        const passwordsMatch = password === confirmPassword;
        const requestPasswordChange = (password !== '') &&
            passwordsMatch &&
            (currentPassword !== password) &&
            (currentPassword !== '');

        // When hooking this up, we'll want to make sure we only send relevant changes
        if (fieldHasChanged || (requestPasswordChange)) {
            return false;
        }

        return true;
    }

    _submit(ev) {

        const { firstName, lastName, email, password } = this.state;

        this.props.onSubmit({ email, password, firstName, lastName  });

        ev.preventDefault();
    }

    render() {

        return (
            <FormWrapper>
                <form onSubmit={this.submit}>
                    <TextWrapper>
                        <Typography variant='headline' gutterBottom>Settings</Typography>
                        {this.props.errorMessage &&
                            <FormHelperText>Error: {this.props.errorMessage}</FormHelperText>
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
                    </TextWrapper>
                    <TextWrapper>
                        <Typography variant='subheading'>Change Password</Typography>
                        <TextField
                            id='currentPassword'
                            type='password'
                            variant='outlined'
                            label='Current Password'
                            margin='normal'
                            fullWidth
                            value={this.fieldValue('currentPassword')}
                            onChange={this.proposeNew('currentPassword')}
                        />
                        <TextField
                            id='password'
                            type='password'
                            variant='outlined'
                            label='New Password'
                            margin='normal'
                            fullWidth
                            value={this.fieldValue('password')}
                            onChange={this.proposeNew('password')}
                        />
                        <TextField
                            id='confirmPassword'
                            type='password'
                            variant='outlined'
                            label='Confirm New Password'
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
                        >Save Changes</Button>
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
                </form>
            </FormWrapper>
        );
    }
};
