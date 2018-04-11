const React = require('react');
const T = require('prop-types');
const StrangeForms = require('strange-forms');

module.exports = class ForgotPassword extends StrangeForms(React.Component) {

    static propTypes = {
        requestReset: T.func.isRequired
    };

    constructor(props) {

        super(props);

        this.state = {
            email: ''
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
                        value={this.fieldValue('email')}
                        onChange={this.proposeNew('email')}
                    />
                </div>
                <button className='btn btn-default' onClick={this.requestPasswordReset}>Reset Password</button>

            </div>
        );
    }
};
