const React = require('react');
const T = require('prop-types');

module.exports = class Signup extends React.Component {

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
    };

    submit = (ev) => {

        const { email, password } = this.state;
        this.props.onSubmit(email, password);
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
                        />
                    </div>
                    <div className='form-group'>
                        <label>Password</label>
                        <input
                            className='form-control'
                        />
                    </div>
                    <div className='form-group'>
                        <label>Confirm Password</label>
                        <input
                            className='form-control'
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
                    <button className='btn btn-default' type='submit' onClick={this._submit}>Sign Up</button>
                </form>
            </div>
        );
    }
};
