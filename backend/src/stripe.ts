import Stripe from 'stripe';
import { envStripe } from './config/config';

const stripeAPI = new Stripe(envStripe.apiKey as string);

export default stripeAPI;