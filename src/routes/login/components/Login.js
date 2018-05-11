const React = require('react');
const T = require('prop-types');
const NavLink = require('react-router-dom').NavLink;
const StrangeForms = require('strange-forms');

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
            rememberMe: true
        };

        this.strangeForm({
            fields: ['email', 'password', 'rememberMe'],
            get: (someProps, field) => this.state[field],
            act: this.formField.bind(this),
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

    submit = (ev) => {

        const { email, password, rememberMe } = this.state;

        this.props.login({ email, password });
        this.props.rememberAct({ rememberMe });

        ev.preventDefault();

    }

    render() {

        return (

            <div>
                <form onSubmit={this.submit}>
                    <h2>Login</h2>
                    <div>
                        <label>Email:</label>
                        <input
                            value={this.fieldValue('email')}
                            onChange={this.proposeNew('email')}
                        />
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
                    >Login</button>
                </form>
            </div>
        );
    }
};
