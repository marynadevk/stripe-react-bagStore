import { Request, Response } from 'express';
import httpStatus from 'http-status';
import stripeAPI from '../stripe';
import { getCustomer } from '../helpers/getCustomer';
import { ICustomRequest } from '..';

export const updatePaymentIntent = async (req: Request, res: Response) => {
  const request = req as ICustomRequest;
  const {
    currentUser,
    body: { paymentIntentId },
  } = request;

  const customer = await getCustomer(currentUser.uid);
  let paymentIntent;

  try {
    paymentIntent = await stripeAPI.paymentIntents.update(paymentIntentId, {
      customer: customer.id,
    });
    res
      .status(httpStatus.OK)
      .json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.log(error);
    res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: 'unable to update payment intent' });
  }
};
