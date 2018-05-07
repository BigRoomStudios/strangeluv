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

        this.requestPasswordReset = this._requestPasswordReset.bind(this);

        this.strangeForm({
            fields: ['email'],
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

        return ['email', 'password', 'rememberMe'].some((field) => {

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

    _requestPasswordReset() {

        this.props.requestReset({ email: this.state.email });
    }

    render() {

        return (

            <div>
                <h2>Forgot your password?</h2>
                <p>To reset your password, enter your email below and we will email a link to reset your password.</p>
                <div className='form-group'>
                    <label>Email:</label>
                    <input
                        className='form-control'
                        id='email'
                        value={this.fieldValue('email')}
                        onChange={this.proposeNew('email')}
                        onBlur={this.fieldBlurred}
                    />
                    {this.invalidEmail() && <label style={{ color:'red' }}>Please enter a valid email address</label>}
                </div>
                {this.props.errorMessage &&
                    <div style={{ color: 'red' }}>Error! {this.props.errorMessage}</div>
                }
                <button className='btn btn-default' onClick={this.requestPasswordReset}>Reset Password</button>

            </div>
        );
    }
};
