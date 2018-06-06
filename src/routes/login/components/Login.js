const React = require('react');
const T = require('prop-types');
const NavLink = require('react-router-dom').NavLink;
const StrangeForms = require('strange-forms');
const IsEmail = require('utils/is-email');

module.exports = class Login extends StrangeForms(React.Component) {

    static propTypes = {
        errorMessage: T.string,
        login: T.func.isRequired,
        rememberAct: T.func.isRequired
    };

    constructor(props, context) {

        super(props, context);

        this.state = {
            email: '',
            password: '',
            rememberMe: true,
            isBlurred: {
                email: false
            }
        };

        this.strangeForm({
            fields: ['email', 'password', 'rememberMe'],
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

    _disableButton() {

        const { email, password } = this.state;
        const fieldHasValue = (email && password) !== '';

        if (fieldHasValue && IsEmail(email)) {
            return false;
        }

        return true;
    }

    _submit(ev) {

        const { email, password, rememberMe } = this.state;

        this.props.login({ email, password });
        this.props.rememberAct(rememberMe);

        ev.preventDefault();
    }

    render() {

        return (

            <form onSubmit={this.submit}>
                <h2>Login</h2>
                <div>
                    <label>Email:</label>
                    <input
                        id='email'
                        value={this.fieldValue('email')}
                        onChange={this.proposeNew('email')}
                        onBlur={this.fieldBlurred}
                    />
                    {this.showEmailError() && <label style={{ color:'red' }}>Please enter a valid email address</label>}
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type='password'
                        value={this.fieldValue('password')}
                        onChange={this.proposeNew('password')}
                    />
                </div>
                <label>
                    <input
                        type='checkbox'
                        checked={this.fieldValue('rememberMe')}
                        onChange={this.proposeNew('rememberMe')}
                    />
                    Remember Me
                </label>
                <p>Don&rsquo;t have an account? <NavLink to='sign-up'>Sign up</NavLink> now.</p>
                <p><NavLink to='forgot-password'>Forget password?</NavLink></p>
                {this.props.errorMessage &&
                    <div style={{ color: 'red' }}>Error! {this.props.errorMessage}</div>
                }
                <button
                    type='submit'
                    onClick={this.submit}
                    disabled={this.disableButton()}
                >Login</button>
            </form>
        );
    }
};
