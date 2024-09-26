import { IInputErrors, IInputValues } from '../interfaces';

export const validateInput = (values: IInputValues): IInputErrors => {
  const { name, email, address } = values;
  const errors: IInputErrors = {};

  if (!email) {
    errors.email = 'Required';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
  ) {
    errors.email = 'Invalid email address';
  }
  if (!name) {
    errors.name = 'Required';
  }
  if (!address) {
    errors.address = 'Required';
  }

  return errors;
};