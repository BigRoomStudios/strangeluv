const React = require('react');
const T = require('prop-types');
const NavLink = require('react-router-dom').NavLink;
const StrangeForms = require('strange-forms');

module.exports = class Login extends StrangeForms(React.Component) {

    static propTypes = {
        errorMessage: T.string,
        login: T.func.isRequired,
        rememberMe: T.bool.isRequired,
        rememberAct: T.func.isRequired
    };

    constructor(props, context) {

        super(props, context);

        this.state = {
            email: '',
            password: '',
            rememberMe: this.props.rememberMe
        };

        // TODO is this the binding pattern we wanna use? Bek likes arrow functions
        this.loginUser = this._loginUser.bind(this);

        this.strangeForm({
            fields: ['email', 'password', 'rememberMe'],
            get: {
                '*': (someProps, field) => ''
                // add remember me get cause it's from props
            },
            act: {
                // rememberMe: this.formCheck.bind(this),
                '*': this.formField.bind(this)
            },
            // add remember me action cause it's from props
            getFormValue: {
                rememberMe: this.getCheckedValue.bind(this),
                '*': this.getFormValue.bind(this)
            }
        });
    }

    getCheckedValue(e) {

        return e.target.checked;
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

    _loginUser() {

        this.props.login({ email: this.state.email, password: this.state.password });
        this.props.rememberAct({ remember: this.state.rememberMe });
    }

    render() {

        return (

            <div>

                <h2>Login</h2>
                <div className='form-group'>
                    <label>Email:</label>
                    <input
                        className='form-control'
                        value={this.fieldValue('email')}
                        onChange={this.proposeNew('email')}
                    />
                </div>
                <div className='form-group'>
                    <label>Password:</label>
                    <input
                        className='form-control'
                        type='password'
                        value={this.fieldValue('password')}
                        onChange={this.proposeNew('password')}
                    />
                </div>
                <div className='checkbox'>
                    <label>
                        <input
                            type='checkbox'
                            checked={this.fieldValue('rememberMe')}
                            onChange={this.proposeNew('rememberMe')}
                        />
                        Remember Me
                    </label>
                </div>
                <p>Don't have an account? <NavLink to='sign-up'>Sign up</NavLink> now.</p>
                <p><NavLink to='forgot-password'>Forget password?</NavLink></p>

                {/* TODO fix this! Currently this errors because of the auth initializer, and we need to adjust this to show an error when it actually errors from a bad request - not just based on state */}
                {this.props.errorMessage && <div style={{ color: 'red' }}>Error! {this.props.errorMessage}</div>}
                <button className='btn btn-default' onClick={this.loginUser}>Login</button>

            </div>
        );
    }
};
