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

        this.strangeForm({
            fields: ['email', 'password', 'confirmPassword'],
            get: (someProps, field) => this.state[field],
            act: (field, value) => this.setState({ [field]: value }),
            getFormValue: (e) => e.target.value || ''
        });

        this.fieldBlurred = this._fieldBlurred.bind(this);
        this.showEmailError = this._showEmailError.bind(this);
        this.showPasswordError = this._showEmailError.bind(this);
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
            <form onSubmit={this.submit}>
                <h2>Reset Password</h2>
                <p>Please confirm your email address and set your new password below.</p>
                <div>
                    <label>Email</label>
                    <input
                        id='email'
                        type='email'
                        value={this.fieldValue('email')}
                        onChange={this.proposeNew('email')}
                        onBlur={this.fieldBlurred}
                    />
                    {this.showEmailError() &&
                        <label style={{ color:'red' }}>Please enter a valid email address</label>
                    }
                </div>
                <div>
                    <label>Password</label>
                    <input
                        id='password'
                        type='password'
                        value={this.fieldValue('password')}
                        onChange={this.proposeNew('password')}
                    />
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input
                        id='confirmPassword'
                        type='password'
                        value={this.fieldValue('confirmPassword')}
                        onChange={this.proposeNew('confirmPassword')}
                        onBlur={this.fieldBlurred}
                    />
                    {this.showPasswordError() &&
                        <label style={{ color:'red' }}>Please enter matching passwords</label>
                    }
                </div>
                {this.props.errorMessage &&
                    <div style={{ color: 'red' }}>Error! {this.props.errorMessage}</div>
                }
                <button
                    type='submit'
                    onClick={this.submit}
                    disabled={this.disableButton()}
                >Update Password</button>
            </form>
        );
    }
};
