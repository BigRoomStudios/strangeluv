const React = require('react');
const T = require('prop-types');
const StrangeForms = require('strange-forms');

module.exports = class Signup extends StrangeForms(React.Component) {

    static propTypes = {
        onSubmit: T.func.isRequired
    };

    constructor(props) {

        super(props);

        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            confirmPasswordHasBlurred: false
        };

        //this.submit = this._submit.bind(this);

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

    submit = (ev) => {

        const { email, password } = this.state;
        this.props.onSubmit({ email, password });
        ev.preventDefault();
    }

    render() {

        return (

            <div>
                <h2>Sign Up</h2>
                <form onSubmit={this.submit}>
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
                    <div className='checkbox'>
                        <label>
                            <input
                                type='checkbox'
                            />
                            Remember Me
                        </label>
                    </div>
                    <button className='btn btn-default' type='submit' onClick={this.submit}>Sign Up</button>
                </form>
            </div>
        );
    }
};
