const React = require('react');
const T = require('prop-types');
const StrangeForms = require('strange-forms');

module.exports = class Login extends StrangeForms(React.Component) {

    static propTypes = {
        errored: T.bool,
        login: T.func.isRequired
    };

    constructor(props, context) {

        super(props, context);

        this.state = {
            email: '',
            password: ''
        };

        // TODO is this the binding pattern we wanna use? Bek likes arrow functions
        this._boundLoginUser = this.loginUser.bind(this);

        this.strangeForm({
            fields: ['email', 'password'],
            get: {
                '*': (someProps, field) => ''
            },
            act: this.act.bind(this),
            getFormValue: this.getFormValue.bind(this)
        });
    }

    getFormValue(e) {

        return e.target.value || '';
    }

    act(field, value) {

        this.setState({ [field]: value });
    }

    invalid() {

        return ['email', 'password'].some((field) => {

            return this.fieldError(field);
        });
    }

    loginUser() {

        this.props.login({ email: this.state.email, password: this.state.password });
    }

    render() {

        console.log(this.state);

        // TODO in MBM we had form validation here. Is this the right spot? What does strangeforms invalid() do?

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
                        value={this.fieldValue('password')}
                        onChange={this.proposeNew('password')} />
                </div>

                {/* TODO fix this! Currently this errors because of the auth initializer, and we need to adjust this to show an error when it actually errors from a bad request - not just based on state */}
                {this.props.errored &&

                    <div className='alert-danger alert'>Looks like you have bad credentials. Please try again!</div>}

                <button className='btn btn-default' onClick={this._boundLoginUser}>Login</button>

            </div>
        );
    }
};
