import { Request, Response } from 'express';
import stripeAPI from '../stripe';
import httpStatus from 'http-status';

interface CustomRequest extends Request {
  currentUser: {
    uid: string;
  };
}

export async function setupIntent(req: CustomRequest, res: Response) {
  const { currentUser } = req;

  // Get Stripe customer
  let setupIntent;

  try {
    setupIntent = await stripeAPI.setupIntents.create({
    });
    res.status(httpStatus.OK).json(setupIntent);
  } catch (error) {
    console.log(error);
    res.status(httpStatus.BAD_REQUEST).json({ error: 'An error occurred, unable to create setup intent' });
  }
}