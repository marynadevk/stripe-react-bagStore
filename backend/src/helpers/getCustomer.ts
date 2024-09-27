import { db } from '../firebase';
import stripeAPI from '../stripe';
import { createCustomer } from './createCustomer';

export const getCustomer = async (userId: string) => {
  const userSnapshot = await db.collection('users').doc(userId).get();
  const userData = userSnapshot.data();

  if (!userData || !userData.stripeCustomerId) {
    return createCustomer(userId);
  }
  const { stripeCustomerId } = userData;

  const customer = await stripeAPI.customers.retrieve(stripeCustomerId);
  return customer;
};
