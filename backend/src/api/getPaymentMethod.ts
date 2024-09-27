import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { getCustomer } from '../helpers/getCustomer';
import stripeAPI from '../stripe';
import { ICustomRequest } from '..';

export const getCards = async (req: Request, res: Response) => {
  const request = req as ICustomRequest;
  const currentUser = request.currentUser;
  const customer = await getCustomer(currentUser.uid);
  let cards;

  try {
    cards = await stripeAPI.paymentMethods.list({
      customer: customer.id,
      type: 'card',
    });
    res.status(httpStatus.OK).json(cards.data);
  } catch (error) {
    console.log(error);
    res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: 'an error occurred, unable to get cards' });
  }
};
