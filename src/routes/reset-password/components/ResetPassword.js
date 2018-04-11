const React = require('react');
const StrangeForms = require('strange-forms');


module.exports = class ResetPassword extends StrangeForms(React.Component) {

    constructor(props) {

        super(props);

        this.state = {
            email: '',
            password: '',
            confirmPassword: ''
        };

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

        return ['email', 'password', 'rememberMe'].some((field) => {

            return this.fieldError(field);
        });
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
                <button className='btn btn-default' type='submit' >Update Password</button>
            </div>

        );
    }
};
