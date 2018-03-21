const React = require('react');
const T = require('prop-types');

module.exports = class extends React.Component {

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

        this._boundLoginUser = this.loginUser.bind(this);
    }

    handleEmailChange = (event) => {

        this.setState({
            email: event.target.value
        });
    };

    handlePasswordChange = (event) => {

        this.setState({
            password: event.target.value
        });
    };

    loginUser() {

        this.props.login({ email: this.state.email, password: this.state.password });
    }

    render() {

        return (

            <div>

                <h2>Login</h2>
                <div className='form-group'>
                    <label>Email:</label>
                    <input className='form-control' value={this.state.email} onChange={this.handleEmailChange} />
                </div>
                <div className='form-group'>
                    <label>Password:</label>
                    <input className='form-control' value={this.state.password} onChange={this.handlePasswordChange} />
                </div>

                {this.props.errored &&
                    <div className='alert-danger alert'>Looks like you have bad credentials. Please try again!</div>}

                <button className='btn btn-default' onClick={this._boundLoginUser}>Login</button>

            </div>
        );
    }
};
