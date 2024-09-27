import express, { Request } from 'express';
import cors from 'cors';
import './firebase';
import { envConfig } from './config/config';
import createCheckoutSession from './api/checkout';
import { webhook } from './api/webhook';
import { paymentIntent } from './api/paymentIntent';
import { decodeJWT } from './auth/decodeJWT';
import { setupIntent } from './api/setupIntent';
import { validateUser } from './auth/validateUser';
import { getCards } from './api/getPaymentMethod';
import { updatePaymentIntent } from './api/updatePaymentIntent';

export interface ICustomRequest extends Request {
  rawBody?: Buffer | string;
  currentUser?: any;
}

const app = express();
const port = envConfig.port;

app.use(cors({ origin: true }));
app.use(
  express.json({
    verify: (req: ICustomRequest, _res, buffer) => (req.rawBody = buffer),
  })
);

app.use(decodeJWT);

app.get('/', (_req, res) => {
  res.send('Hello World!');
});
app.post('/create-checkout-session', createCheckoutSession);
app.post('/create-payment-intent', paymentIntent);
app.post('/save-payment-method', validateUser, setupIntent);
app.get('/get-payment-method', validateUser, getCards);
app.put('/update-payment-intent', validateUser, updatePaymentIntent);
app.post('/webhook', webhook);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
