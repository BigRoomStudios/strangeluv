const React = require('react');
const T = require('prop-types');
const StrangeForms = require('strange-forms');
const IsEmail = require('utils/is-email');

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

    disableButton = () => {

        const { email } = this.state;
        const fieldHasValue = email !== '';

        if (fieldHasValue && IsEmail(email)) {
            return false;
        }

        return true;
    }

    submit = (ev) => {

        const { email } = this.state;

        this.props.requestReset({ email });

        ev.preventDefault();
    }

    render() {

        return (

            <div>
                <form onSubmit={this.submit}>
                    <h2>Forgot your password?</h2>
                    <p>To reset your password, enter your email below and we will email a link to reset your password.</p>
                    <div>
                        <label>Email:</label>
                        <input
                            id='email'
                            value={this.fieldValue('email')}
                            onChange={this.proposeNew('email')}
                            onBlur={this.fieldBlurred}
                        />
                        {this.showEmailError() &&
                            <label style={{ color:'red' }}>Please enter a valid email address</label>
                        }
                    </div>
                    {this.props.errorMessage &&
                        <div style={{ color: 'red' }}>Error! {this.props.errorMessage}</div>
                    }
                    <button
                        type='submit'
                        onClick={this.submit}
                        disabled={this.disableButton()}
                    >Reset Password</button>
                </form>
            </div>
        );
    }
};