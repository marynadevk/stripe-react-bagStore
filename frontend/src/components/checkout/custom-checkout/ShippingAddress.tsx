import { Formik } from 'formik';
import { validateInput } from '../../../helpers/validateInput';
import { FC } from 'react';

type FormValues = {
  email: string;
  name: string;
  address: string;
};

const FIELDS: Array<{ type: string; name: keyof FormValues; placeholder: string }>  = [
  { type: 'text', name: 'name', placeholder: 'Name' },
  { type: 'email', name: 'email', placeholder: 'Email' },
  { type: 'text', name: 'address', placeholder: 'Address' },
];

type Props = {
  setShipping: (values: FormValues) => void;
};

const ShippingAddress: FC<Props> = ({ setShipping }) => {
  const initialValues = {
    email: '',
    name: '',
    address: '',
  };
  return (
    <div>
      <h4>Shipping Address</h4>
      <Formik
        initialValues={initialValues}
        validate={validateInput}
        onSubmit={(values) => {
          console.log('values', values);
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
