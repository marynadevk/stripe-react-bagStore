import { Response } from 'express';
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

export const webhook = (req: CustomRequest, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;
  let event;

  try {
    event = stripeAPI.webhooks.constructEvent(
      req['rawBody'], sig, envStripe.webhookSecret
    );
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(`Webhook error: ${error}`);
  }

  const handler = webHookHandlers[event.type];
  if (handler) {
    handler(event.data.object);
  }

  res.status(httpStatus.OK).send('Webhook received');
};