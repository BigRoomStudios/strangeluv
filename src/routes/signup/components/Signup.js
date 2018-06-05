const React = require('react');
const T = require('prop-types');
const NavLink = require('react-router-dom').NavLink;
const StrangeForms = require('strange-forms');
const IsEmail = require('utils/is-email');

module.exports = class Signup extends StrangeForms(React.Component) {

    static propTypes = {
        onSubmit: T.func.isRequired,
        errorMessage: T.string,
        rememberAct: T.func.isRequired
    };

    constructor(props) {

        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            rememberMe: true,
            isBlurred: {
                email: false,
                confirmPassword: false
            }
        };

        this.strangeForm({
            fields: ['firstName', 'lastName', 'email', 'password', 'confirmPassword', 'rememberMe'],
            get: (someProps, field) => this.state[field],
            act: (field, value) => this.setState({ [field]: value }),
            getFormValue: {
                rememberMe: this.getCheckedValue.bind(this),
                '*': this.getFormValue.bind(this)
            }
        });

        this.fieldBlurred = this._fieldBlurred.bind(this);
        this.showEmailError = this._showEmailError.bind(this);
        this.showPasswordError = this._showEmailError.bind(this);
        this.disableButton = this._disableButton.bind(this);
        this.submit = this._submit.bind(this);
    }

    getCheckedValue(e) {

        return e.target.checked;
    }

    getFormValue(e) {

        return e.target.value || '';
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

        const { firstName, lastName, email, password, confirmPassword } = this.state;
        const fieldHasValue = (firstName && lastName && email && password) !== '';
        const passwordsMatch = password === confirmPassword;

        if (fieldHasValue && IsEmail(email) && passwordsMatch) {
            return false;
        }

        return true;
    }

    _submit(ev) {

        const { firstName, lastName, email, password } = this.state;

        this.props.onSubmit({ email, password, firstName, lastName  });
        ev.preventDefault();
    }

    render() {

        return (

            <form onSubmit={this.submit}>
                <h2>Sign Up</h2>
                <div>
                    <label>First Name</label>
                    <input
                        id='firstName'
                        type='text'
                        value={this.fieldValue('firstName')}
                        onChange={this.proposeNew('firstName')}
                        onBlur={this.fieldBlurred}
                    />
                </div>
                <div>
                    <label>Last Name</label>
                    <input
                        id='lastName'
                        type='text'
                        value={this.fieldValue('lastName')}
                        onChange={this.proposeNew('lastName')}
                        onBlur={this.fieldBlurred}
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        id='email'
                        type='email'
                        value={this.fieldValue('email')}
                        onChange={this.proposeNew('email')}
                        onBlur={this.fieldBlurred}
                    />
                    {this.showEmailError() && <label style={{ color:'red' }}>Please enter a valid email address</label>}
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
                    {this.showPasswordError() && <label style={{ color:'red' }}>Please enter matching passwords</label>}
                </div>
                <label>
                    <input
                        type='checkbox'
                        checked={this.fieldValue('rememberMe')}
                        onChange={this.proposeNew('rememberMe')}
                    />
                    Remember Me
                </label>
                <p>Already have an account? <NavLink to='login'>Login</NavLink> now.</p>
                {this.props.errorMessage &&
                    <div style={{ color: 'red' }}>Error! {this.props.errorMessage}</div>
                }
                <button
                    type='submit'
                    onClick={this.submit}
                    disabled={this.disableButton()}
                >Sign Up</button>
            </form>
        );
    }
};
