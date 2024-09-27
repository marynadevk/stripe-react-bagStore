import { db } from '../firebase';
import stripeAPI from '../stripe';

export const createCustomer = async (userId: string) => {
  const userSnapshot = await db.collection('users').doc(userId).get();
  if (!userSnapshot.exists) {
    throw new Error('User not found');
  }
  const userData = userSnapshot.data();
  if (!userData) {
    throw new Error('User data not found');
  }
  const { email } = userData;

  const customer = await stripeAPI.customers.create({
    email,
    metadata: {
      firebaseUID: userId,
    },
  });

  await userSnapshot.ref.update({ stripeCustomerId: customer.id });
  return customer;
};
