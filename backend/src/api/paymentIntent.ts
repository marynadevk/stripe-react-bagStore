import { Request, Response } from 'express';
import stripeAPI from '../stripe';
import httpStatus from 'http-status';
import { calculateOrderAmount } from '../helpers/calculateOrderAmount';

export const paymentIntent = async (req: Request, res: Response) => {
  const { cartItems, description, receipt_email, shipping } = req.body;
  let paymentIntent;

  try {
    paymentIntent = await stripeAPI.paymentIntents.create({
      amount: calculateOrderAmount(cartItems),
      currency: 'usd',
      description,
      payment_method_types: ['card'],
      receipt_email,
      shipping,
    });

    res
      .status(httpStatus.OK)
      .json({
        clientSecret: paymentIntent.client_secret,
        id: paymentIntent.id,
      });
  } catch (error) {
    console.log(error);
    res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: 'An error occurred, unable to create payment intent' });
  }
};
