const React = require('react');
const Forms = require('react-redux-form');
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
    const submit = props.submit;

    return (
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
            onSubmit={submit}>

            {/* Successfully submitted? */}
            {submitted &&
                <div>Success!</div>}

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
                {/* Clicking this causes submit */}
                <button>Submit!</button>
            </div>
        </Form>
    );

};

LoginForm.propTypes = {
    submitted: React.PropTypes.bool,
    fields: React.PropTypes.object.isRequired,
    modelProp: React.PropTypes.func.isRequired,
    submit: React.PropTypes.func.isRequired
};

module.exports = LoginForm;
