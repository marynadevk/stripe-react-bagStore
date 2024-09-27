import { Request, Response } from 'express';
import stripeAPI from '../stripe';
import httpStatus from 'http-status';
import { ICustomRequest } from '..';
import { envStripe } from '../config/config';
import { webHookHandlers } from '../helpers/webHookHandlers';

export const webhook = (req: Request, res: Response): Response => {
  const request = req as ICustomRequest;

  const sig = request.headers['stripe-signature'] as string;
  let event;
  try {
    if (!request['rawBody']) {
      return res.status(httpStatus.BAD_REQUEST).send('Missing raw body');
    }

    event = stripeAPI.webhooks.constructEvent(
      request['rawBody'] as string | Buffer, sig, envStripe.webhookSecret
    );
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(`Webhook error: ${error}`);
  }

  const handler = webHookHandlers[event.type];
  if (handler) {
    handler(event.data.object);
  }

  return res.status(httpStatus.OK).send('Webhook received');
};