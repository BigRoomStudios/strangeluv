const React = require('react');
const T = require('prop-types');
const NavLink = require('react-router-dom').NavLink;
const StrangeForms = require('strange-forms');
const IsEmail = require('utils/is-email');

module.exports = class Signup extends StrangeForms(React.Component) {

    static propTypes = {
        onSubmit: T.func.isRequired,
        errorMessage: T.string
    };

    constructor(props) {

        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            isBlurred: {
                email: false,
                confirmPassword: false
            }
        };

        // TODO add rememberme ya dingdong!

        this.strangeForm({
            fields: ['firstName', 'lastName', 'email', 'password', 'confirmPassword'],
            get: (someProps, field) => this.state[field],
            act: this.formField.bind(this),
            getFormValue: this.getFormValue.bind(this)
        });
    }

    getFormValue(e) {

        return e.target.value || '';
    }

    formField(field, value) {

        this.setState({ [field]: value });
    }

    invalid() {

        return ['firstName', 'lastName', 'email', 'password', 'confirmPassword'].some((field) => {

            // returns true if invalid
            return this.fieldError(field);
        });
    }

    fieldBlurred = (ev) => {

        const isBlurred = { ...this.state.isBlurred };
        const field = ev.target.id;

        isBlurred[field] = true;

        this.setState({ isBlurred });
    }

    invalidEmail = () => {

        if ( this.state.isBlurred.email) {

            if ( IsEmail(this.state.email) ) {

                return false;
            }

            return true;
        }
    }

    invalidPassword = () => {

        if (this.state.isBlurred.confirmPassword) {

            if (this.state.password === this.state.confirmPassword) {

                return false;
            }

            return true;
        }
    }

    submit = (ev) => {

        const { firstName, lastName, email, password } = this.state;

        this.props.onSubmit({ email, password, firstName, lastName  });
        ev.preventDefault();
    }

    render() {

        return (

            <div>
                <h2>Sign Up</h2>
                <form onSubmit={this.submit}>
                    <div className='form-group'>
                        <label>First Name</label>
                        <input
                            className='form-control'
                            id='firstName'
                            type='text'
                            value={this.fieldValue('firstName')}
                            onChange={this.proposeNew('firstName')}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Last Name</label>
                        <input
                            className='form-control'
                            id='lastName'
                            type='text'
                            value={this.fieldValue('lastName')}
                            onChange={this.proposeNew('lastName')}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Email</label>
                        <input
                            className='form-control'
                            id='email'
                            type='email'
                            value={this.fieldValue('email')}
                            onChange={this.proposeNew('email')}
                            onBlur={this.fieldBlurred}
                        />
                        {this.invalidEmail() && <label style={{ color:'red' }}>Please enter a valid email address</label>}
                    </div>
                    <div className='form-group'>
                        <label>Password</label>
                        <input
                            className='form-control'
                            id='password'
                            type='password'
                            value={this.fieldValue('password')}
                            onChange={this.proposeNew('password')}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Confirm Password</label>
                        <input
                            className='form-control'
                            id='confirmPassword'
                            type='password'
                            value={this.fieldValue('confirmPassword')}
                            onChange={this.proposeNew('confirmPassword')}
                            onBlur={this.fieldBlurred}
                        />
                        {this.invalidPassword() && <label style={{ color:'red' }}>Please enter matching passwords</label>}
                    </div>
                    <div className='checkbox'>
                        <label>
                            <input
                                type='checkbox'
                            />
                            Remember Me
                        </label>
                    </div>
                    <p>Already have an account? <NavLink to='login'>Login</NavLink> now.</p>
                    {this.props.errorMessage &&
                        <div style={{ color: 'red' }}>Error! {this.props.errorMessage}</div>
                    }
                    <button
                        className='btn btn-default'
                        type='submit'
                        onClick={this.submit}
                    >Sign Up</button>
                </form>
            </div>
        );
    }
};
