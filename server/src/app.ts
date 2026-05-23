import express from 'express';
import cors from 'cors';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN ?? 'https://take-home-test-tmca.vercel.app',
}));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', routes);
app.use(errorHandler);

export default app;
