import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../shared/Layout';
import { Formik, FormikHelpers } from 'formik';
import {
  auth,
  createUserProfileDocument,
} from '../../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { IInputErrors, IInputValues } from '../../interfaces';
import './signUp.styles.scss';

type FormValues = Pick<IInputValues, 'firstname' | 'email' | 'password'>;
type FormErrors = Pick<IInputErrors, 'firstname' | 'email' | 'password'>;

const validate = (values: FormValues): FormErrors => {
  const errors: FormErrors = {};

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.firstname) {
    errors.firstname = 'Required';
  }

  if (!values.password) {
    errors.password = 'Required';
  }

  return errors;
};




const FIELDS: Array<{
  type: string;
  name: keyof FormValues;
  placeholder: string;
}> = [
  { type: 'email', name: 'email', placeholder: 'Email' },
  { type: 'text', name: 'firstname', placeholder: 'First Name' },
  { type: 'password', name: 'password', placeholder: 'Password' },
];

const SignUp = () => {
  const initialValues: FormValues = {
    firstname: '',
    email: '',
    password: '',
  };
  const [error, setError] = useState<any>(null);
  const navigate = useNavigate();

  const handleSignUp = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    const { firstname, email, password } = values;

    try {
      if (!auth || !email || !password) return;
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await createUserProfileDocument(user, { displayName: firstname });
      navigate('/shop');
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      setError(error);
      throw new Error('Error signing up');
    }
  };

  return (
    <Layout>
      <div className="sign-up">
        <h1>Sign Up</h1>
        <div className="form-container">
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSignUp}
          >
            {({ values, errors, handleChange, handleSubmit, isSubmitting }) => {
              return (
                <form onSubmit={handleSubmit}>
                  {FIELDS.map((field) => (
                    <div key={field.name}>
                      <input
                        type={field.type}
                        name={field.name}
                        onChange={handleChange}
                        value={values[field.name]}
                        placeholder={field.placeholder}
                        className={
                          'baggo-input ' + (errors[field.name] ? 'error' : '')
                        }
                      />
                    </div>
                  ))}
                  <div className="submit-btn">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="button is-black baggo-btn submit"
                    >
                      Sign Up
                    </button>
                  </div>
                  <div className="error-message">
                    {error && <p>{error.message}</p>}
                  </div>
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
