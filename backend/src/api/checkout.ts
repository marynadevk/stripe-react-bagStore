import { Request, Response } from 'express';
import stripeAPI from '../stripe';
import httpStatus from 'http-status';

const createCheckoutSession = async (req: Request, res: Response) => {
  const domainUrl = process.env.WEB_APP_URL;
  const { line_items, customer_email } = req.body;
  if (!line_items || !customer_email) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: 'missing required session parameters' });
  }

  let session;

  try {
    session = await stripeAPI.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      customer_email,
      success_url: `${domainUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainUrl}/canceled`,
      shipping_address_collection: { allowed_countries: ['GB', 'US'] },
    });
    res.status(httpStatus.OK).json({ sessionId: session.id });
  } catch (error) {
    console.log(error);
    res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: 'an error occurred, unable to create session' });
  }
};

export default createCheckoutSession;
