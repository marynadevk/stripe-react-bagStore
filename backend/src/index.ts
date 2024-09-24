import express from 'express';
import cors from 'cors';
import { envConfig } from './config/config';

const app = express();
const port = envConfig.port;

app.use(cors({ origin: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});