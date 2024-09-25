import express, { Request } from 'express';
import cors from 'cors';
import { envConfig } from './config/config';
import createCheckoutSession from './api/checkout';

export interface CustomRequest extends Request {
  rawBody: Buffer | string;
}

const app = express();
const port = envConfig.port;

app.use(cors({ origin: true }));
app.use(
  express.json({
    verify: (req: CustomRequest, _res, buffer) => (req.rawBody = buffer),
  })
);

app.get('/', (_req, res) => {
  res.send('Hello World!');
});
app.post('/create-checkout-session', createCheckoutSession);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
