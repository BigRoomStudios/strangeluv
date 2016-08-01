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

    const fields = props.fields;
    const modelProp = props.modelProp;

    const authLogin = props.authLogin;
    const isLoggedIn = props.isLoggedIn;

    // !important When putting variables in a template, you have to typecast to String!
    const isLoginPending = String(props.isLoginPending);

    const logout = props.authLogout;

    const authInfo = props.authInfo;

    const userInfo = authInfo.credentials.user || {};

    return (
        <div>

            {/* To conditionally show a template piece, wrap that piece of template in a condition like the Form element below: */}
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

                    <h5>Username</h5>

                    {/* Hook field value up to the model's username */}
                    <Field model={modelProp('username')}>
                        <input type="input" />
                    </Field>

                    {/* Display validation error message */}
                    {fields.username.touched && fields.username.errors.required &&
                        <div className={Classes.error}>Username is required</div>}

                    <h5>Password</h5>

                    {/* Hook field value up to the model's password */}
                    <Field model={modelProp('password')}>
                        <input type="password" />
                    </Field>

                    {/* Display validation error message */}
                    {fields.password.touched && fields.password.errors.required &&
                        <div className={Classes.error}>Password is required</div>}

                    <div>
                        {authInfo.error.login &&
                            <div className={Classes.error}>There was a problem with your username or password</div>
                        }

                        {/* Clicking this causes login attempt */}
                        <button className={Classes['auth-button']}>Login!</button>
                        <div className={Classes['auth-note']}><b>Note</b>: Login only with these creds: <span className={Classes.emphasized}>user / password</span></div>
                    </div>
                </Form>}

            {/* Conditionally show a template piece: */}
            {isLoggedIn && <div>
                <button onClick={logout} className={Classes['auth-button']}>Logout!</button>
                <div className={Classes['auth-note']}><b>Note</b>: Strange Auth sets <span className={Classes.emphasized}>logged in</span> to false immediately <br />
                regardless if logout was successful on the server or not.</div>
            </div>}

            <div className={Classes['login-info']}>

                <h4>Auth Info</h4>

                <div>logged in: {String(isLoggedIn)}</div>
                <div>login pending: {isLoginPending}</div>
                <div>status: {authInfo.status}</div>
                <br />
                <div>credentials:</div>
                <div>

                    <div>JSON Web Token: {authInfo.credentials.jwt}</div>

                    {/* Translate an object into a template like so: */}
                    {Object.keys(userInfo).map((key) => {

                        return <div key={key}>
                            {key}: {userInfo[key]}
                        </div>;
                    })}
                </div>
                <br />
                <div>login artifacts:</div>
                <div>
                    {/* Translate an object into a template like so: */}
                    {Object.keys(authInfo.artifacts).map((key) => {

                        return <div key={key}>
                            {key}: {authInfo.artifacts[key]}
                        </div>;
                    })}
                </div>
            </div>
        </div>
    );
};

LoginForm.propTypes = {
    fields: React.PropTypes.object.isRequired,
    modelProp: React.PropTypes.func.isRequired,
    authLogout: React.PropTypes.func.isRequired,
    authLogin: React.PropTypes.func.isRequired,
    isLoggedIn: React.PropTypes.bool,
    authInfo: React.PropTypes.object,
    isLoginPending: React.PropTypes.bool
};

module.exports = LoginForm;
