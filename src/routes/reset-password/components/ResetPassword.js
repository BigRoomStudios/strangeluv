const React = require('react');
const T = require('prop-types');
const StrangeForms = require('strange-forms');

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
            confirmPassword: ''
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

    _resetPassword() {

        const { email, password } = this.state;

        const resetToken = this.props.match.params.token;

        this.props.resetPassword(email, password, resetToken);
    }

    // TODO let's add some validation for email, matching passwords!

    render() {

        console.log(this.props);

        return (
            <div>
                <h2>Reset Password</h2>
                <p>Please confirm your email address and set your new password below.</p>
                <div className='form-group'>
                    <label>Email</label>
                    <input
                        className='form-control'
                        value={this.fieldValue('email')}
                        onChange={this.proposeNew('email')}
                    />
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input
                        className='form-control'
                        type='password'
                        value={this.fieldValue('password')}
                        onChange={this.proposeNew('password')}
                    />
                </div>
                <div className='form-group'>
                    <label>Confirm Password</label>
                    <input
                        className='form-control'
                        type='password'
                        value={this.fieldValue('confirmPassword')}
                        onChange={this.proposeNew('confirmPassword')}
                    />
                </div>
                {this.props.errorMessage &&
                    <div style={{ color: 'red' }}>Error! {this.props.errorMessage}</div>
                }
                <button className='btn btn-default' type='submit' onClick={this.resetPassword}>Update Password</button>
            </div>

        );
    }
};
