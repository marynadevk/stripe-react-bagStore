import { Formik } from 'formik';
import { FC } from 'react';
import { IInputErrors, IInputValues } from '../../../interfaces';

type FormValues = Pick<IInputValues, 'name' | 'email' | 'address'>;
type FormErrors = Pick<IInputErrors, 'name' | 'email' | 'address'>;

const validate = (values: FormValues): FormErrors => {
  const errors: FormErrors = {};

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.name) {
    errors.name = 'Required';
  }
  if (!values.address) {
    errors.address = 'Required';
  }
  return errors;
};

const FIELDS: Array<{
  type: string;
  name: keyof FormValues;
  placeholder: string;
}> = [
  { type: 'text', name: 'name', placeholder: 'Name' },
  { type: 'email', name: 'email', placeholder: 'Email' },
  { type: 'text', name: 'address', placeholder: 'Address' },
];

type Props = {
  setShipping: (values: FormValues) => void;
};

const ShippingAddress: FC<Props> = ({ setShipping }) => {
  const initialValues: FormValues = {
    email: '',
    name: '',
    address: '',
  };

  return (
    <div>
      <h4>Shipping Address</h4>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values) => {
          setShipping(values);
        }}
      >
        {({ values, errors, handleChange, handleSubmit }) => {
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
                  className="button is-black baggo-btn submit"
                >
                  CONTINUE
                </button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ShippingAddress;
