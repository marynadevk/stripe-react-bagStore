import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, FormikHelpers } from 'formik';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { IInputErrors, IInputValues } from '../../interfaces';
import Layout from '../shared/Layout';
import '../sign-up/signUp.styles.scss';

type FormValues = Pick<IInputValues, 'email' | 'password'>;
type FormErrors = Pick<IInputErrors, 'email' | 'password'>;

const validate = (values: FormValues): FormErrors => {
  const errors: FormErrors = {};

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
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
  { type: 'password', name: 'password', placeholder: 'Password' },
];

const SignIn = () => {
  const [error, setError] = useState<any>(null);
  const initialValues: FormValues = {
    email: '',
    password: '',
  };
  const navigate = useNavigate();

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    const { email, password } = values;
    try {
      if (!auth || !email || !password) return;
      await signInWithEmailAndPassword(auth, email, password);
      setSubmitting(false);
      navigate('/shop');
    } catch (error) {
      setSubmitting(false);
      setError(error);
      throw new Error('Error signing in');
    }
  };

  return (
    <Layout>
      <div className="sign-up">
        <h1>Sign In</h1>
        <div className="form-container">
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
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
                      Submit
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

export default SignIn;
