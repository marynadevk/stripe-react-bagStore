import 'dotenv/config';

export const envStripe = {
  apiKey: process.env.STRIPE_API_KEY as string,
  appUrl: process.env.WEB_APP_URL as string
};

export const envConfig = {
  port: process.env.PORT || 8080
};