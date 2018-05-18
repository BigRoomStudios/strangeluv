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
            act: this.setFormField.bind(this),
            getFormValue: this.getFormValue.bind(this)
        });
    }

    getFormValue(e) {

        return e.target.value || '';
    }

    setFormField(field, value) {

        this.setState({ [field]: value });
    }

    fieldBlurred = (ev) => {

        const isBlurred = { ...this.state.isBlurred };
        const field = ev.target.id;

        isBlurred[field] = true;

        this.setState({ isBlurred });
    }

    showEmailError = () => {

        return (this.state.isBlurred.email) && !IsEmail(this.state.email);
    }

    showPasswordError = () => {

        return this.state.isBlurred.confirmPassword && this.state.password !== this.state.confirmPassword;
    }

    renderButton = () => {

        const { email, password, confirmPassword } = this.state;
        let disabled = true;

        if ((email, password) && IsEmail(email) && (password === confirmPassword)) {
            disabled = false;
        }

        return (

            <button
                type='submit'
                onClick={this.submit}
                disabled={disabled}
            >Update Password</button>
        );
    }

    submit= (ev) => {

        const { email, password } = this.state;
        const resetToken = this.props.match.params.token;

        this.props.resetPassword(email, password, resetToken);

        ev.preventDefault();
    }

    render() {

        return (
            <div>
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
                    {this.renderButton()}
                </form>
            </div>
        );
    }
};
