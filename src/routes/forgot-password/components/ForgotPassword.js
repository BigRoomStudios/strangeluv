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
        );
    }
};
