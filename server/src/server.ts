import 'dotenv/config';
import app from './app';

const PORT = process.env.PORT ?? 8001;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
