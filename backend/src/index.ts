import express from 'express';
import cors from 'cors';
import { envConfig } from './config/config';
import createCheckoutSession from './api/checkout';

const app = express();
const port = envConfig.port;

app.use(cors({ origin: true }));
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Hello World!');
});
app.post('/create-checkout-session', createCheckoutSession);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});