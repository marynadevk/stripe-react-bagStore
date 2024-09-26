import { Request, Response } from 'express';
import stripeAPI from '../stripe';
import httpStatus from 'http-status';
import { CustomRequest } from '..';
import { envStripe } from '../config/config';

const webHookHandlers: { [key: string]: (data: any) => void } = {
  'checkout.session.completed': (data) => {
    console.log('Checkout completed successfully', data);
  },
  'payment_intent.succeeded': (data) => {
    console.log('Payment succeeded', data);
  },
  'payment_intent.payment_failed': (data) => {
    console.log('Payment Failed', data);
  }
};

export const webhook = (req: Request, res: Response): Response => {
  const request = req as CustomRequest;

  const sig = request.headers['stripe-signature'] as string;
  let event;
  try {
    event = stripeAPI.webhooks.constructEvent(
      request['rawBody'], sig, envStripe.webhookSecret
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