import { Request, Response } from 'express';
import stripeAPI from '../stripe';
import httpStatus from 'http-status';
import { getCustomer } from '../helpers/getCustomer';

export const setupIntent = async (req: Request, res: Response) => {
  const currentUser: any = (req as any).currentUser;
  
  const customer = await getCustomer(currentUser.uid);
  let setupIntent;

  try {
    setupIntent = await stripeAPI.setupIntents.create({
      customer: customer.id,
    });
    res.status(httpStatus.OK).json(setupIntent);
  } catch (error) {
    console.log(error);
    res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: 'An error occurred, unable to create setup intent' });
  }
};
