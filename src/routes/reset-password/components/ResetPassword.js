const React = require('react');
const T = require('prop-types');
const StrangeForms = require('strange-forms');
const IsEmail = require('utils/is-email');

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

        this.resetPassword = this._resetPassword.bind(this);

        this.strangeForm({
            fields: ['email', 'password', 'confirmPassword'],
            get: {
                '*': (someProps, field) => ''
            },
            act: {
                '*': this.formField.bind(this)
            },
            getFormValue: {
                '*': this.getFormValue.bind(this)
            }
        });
    }

    getFormValue(e) {

        return e.target.value || '';
    }

    formField(field, value) {

        this.setState({ [field]: value });
    }

    invalid() {

        return ['email', 'password', 'confirmPassword'].some((field) => {

            return this.fieldError(field);
        });
    }

    fieldBlurred = (ev) => {

        const isBlurred = { ...this.state.isBlurred };
        const field = ev.target.id;

        isBlurred[field] = true;

        this.setState({ isBlurred });
    }

    invalidEmail = () => {

        if ( this.state.isBlurred.email) {

            if ( IsEmail(this.state.email) ) {

                return false;
            }

            return true;
        }
    }

    invalidPassword = () => {

        if (this.state.isBlurred.confirmPassword) {

            if (this.state.password === this.state.confirmPassword) {

                return false;
            }

            return true;
        }
    }

    _resetPassword() {

        const { email, password } = this.state;

        const resetToken = this.props.match.params.token;

        this.props.resetPassword(email, password, resetToken);
    }

    render() {

        return (
            <div>
                <h2>Reset Password</h2>
                <p>Please confirm your email address and set your new password below.</p>
                <div className='form-group'>
                    <label>Email</label>
                    <input
                        className='form-control'
                        id='email'
                        type='email'
                        value={this.fieldValue('email')}
                        onChange={this.proposeNew('email')}
                        onBlur={this.fieldBlurred}
                    />
                    {this.invalidEmail() && <label style={{ color:'red' }}>Please enter a valid email address</label>}
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input
                        className='form-control'
                        id='password'
                        type='password'
                        value={this.fieldValue('password')}
                        onChange={this.proposeNew('password')}
                    />
                </div>
                <div className='form-group'>
                    <label>Confirm Password</label>
                    <input
                        className='form-control'
                        id='confirmPassword'
                        type='password'
                        value={this.fieldValue('confirmPassword')}
                        onChange={this.proposeNew('confirmPassword')}
                        onBlur={this.fieldBlurred}
                    />
                    {this.invalidPassword() && <label style={{ color:'red' }}>Please enter matching passwords</label>}
                </div>
                {this.props.errorMessage &&
                    <div style={{ color: 'red' }}>Error! {this.props.errorMessage}</div>
                }
                <button className='btn btn-default' type='submit' onClick={this.resetPassword}>Update Password</button>
            </div>
        );
    }
};
