const React = require('react');
const Forms = require('react-redux-form');
const Classes = require('./styles.scss');
const Form = Forms.Form;
const Field = Forms.Field;

const internals = {
    // Validation to check required field
    required: (val) => val && val.length
};

const LoginForm = (props) => {

    const submitted = props.submitted;
    const fields = props.fields;
    const modelProp = props.modelProp;

    const authLogin = props.authLogin;
    const isLoggedIn = props.isLoggedIn;
    
    const isLoginPending = String(props.isLoginPending);

    const authLogout = props.authLogout;

    const authInfo = props.authInfo;

    const userInfo = authInfo.credentials.user || {}

    console.log(isLoggedIn);

    return (
        <div>
            
            {!isLoggedIn &&
                <Form
                    /* Tell form where (in the state tree) the form values live.
                       We'll let the container for this component figure it out. */
                    model={modelProp()}
                    validators={{
                        /* Set field validations */
                        username: { required: internals.required },
                        password: { required: internals.required }
                    }}
                    /* Hook-up submit.  Again, we'll leave this up to the container. */
                    onSubmit={authLogin}>
                    {/* Successfully submitted? */}
                    {submitted &&
                        <div>Success!</div>}
                        <h1></h1>
                    <h5>Username</h5>

                    {/* Hook field value up to the model's username */}
                    <Field model={modelProp('username')}>
                        <input type="input" />
                    </Field>

                    {/* Display validation error message */}
                    {fields.username.touched && fields.username.errors.required &&
                        <div>Email address is required</div>}

                    <h5>Password</h5>

                    {/* Hook field value up to the model's password */}
                    <Field model={modelProp('password')}>
                        <input type="password" />
                    </Field>

                    {/* Display validation error message */}
                    {fields.password.touched && fields.password.errors.required &&
                        <div>Password is required</div>}

                    <div>
                        {/* Clicking this causes login attempt */}
                        <button>Login!</button>
                    </div>
                </Form>}
            
            <div>
                <button onClick={authLogout}>Logout!</button>
            </div>
            
            <div className={Classes['login-info']}>
                
                <h4>Auth Info</h4>
                
                <div>logged in: {String(isLoggedIn)}</div>
                <div>login pending: {isLoginPending}</div>
                <div>status: {authInfo.status}</div>
                <br/>
                <div>credentials:</div>
                <div>
                    {Object.keys(userInfo).map((key) => {
                        return <div key={key}>
                            {key}: {userInfo[key]}
                        </div>
                    })}
                </div>
                <br/>
                <div>login artifacts:</div>
                <div>
                    {Object.keys(authInfo.artifacts).map((key) => {
                        return <div key={key}>
                            {key}: {authInfo.artifacts[key]}
                        </div>
                    })}
                </div>
            </div>
        </div>
    );
};

LoginForm.propTypes = {
    submitted: React.PropTypes.bool,
    fields: React.PropTypes.object.isRequired,
    modelProp: React.PropTypes.func.isRequired,
    loginSubmit: React.PropTypes.func.isRequired,
    logout: React.PropTypes.func.isRequired
};

module.exports = LoginForm;
