import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const UserSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("required"),
});

const SignInSignUpForm = ({ handleSubmit, isRegistration }) => {
  let schema = UserSchema;

  if (isRegistration) {
    schema = schema.concat(
      Yup.object().shape({
        name: Yup.string()
          .min(2, "Too Short!")
          .max(50, "Too Long!")
          .required("Required"),
      })
    );
  }

  const initialValues = {
    email: "",
    password: "",
  };

  if (isRegistration) initialValues.name = "";

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="form-container">
          {isRegistration && (
            <div>
              <label htmlFor="name" style={styles.formLabel}>
                Name<sup style={styles.errorMessage}>*</sup>
              </label>
              <Field name="name" />
            </div>
          )}
          {isRegistration && (
            <ErrorMessage
              name="name"
              component="div"
              style={styles.errorMessage}
            />
          )}
          <div>
            <label htmlFor="email">
              Email<sup style={styles.errorMessage}>*</sup>
            </label>
            <Field name="email" type="email" />
          </div>
          <ErrorMessage
            name="email"
            component="div"
            style={styles.errorMessage}
          />
          <div>
            <label htmlFor="password">
              Password<sup style={styles.errorMessage}>*</sup>
            </label>
            <Field name="password" />
          </div>
          <ErrorMessage
            name="password"
            component="div"
            style={styles.errorMessage}
          />
          <button type="submit">Submit</button>
          {isRegistration ? (
            <Link to="/login">already registererd ? click to login</Link>
          ) : (
            <Link to="/register">need registration ? click to register</Link>
          )}
        </Form>
      )}
    </Formik>
  );
};

const styles = {
  errorMessage: {
    color: "red",
    marginTop: "5px",
    margin: "3px 3px",
  },
};

export default SignInSignUpForm;
