import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { Request, Response } from 'express';




async function ensureDb() {
  try {
    if (mongoose.connection.readyState === 1) return; // already connected
    if (!config.database_url) throw new Error('DATABASE_URL is missing');
    await mongoose.connect(config.database_url);
  } catch (err) {
    console.error('❌ Database connection error:', err);
    throw err;
  }
}

// Local dev: start HTTP server
if (!process.env.VERCEL) {
  ensureDb()
    .then(() => {
      const port = Number(config.port) || 5000;
      app.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
    })
    .catch(() => {
      process.exit(1);
    });
}

// Vercel/serverless handler: ensure DB per invocation and delegate to Express
export default async function handler(req: Request, res: Response) {
  try {
    await ensureDb();
  } catch {
    // If DB fails, still allow /health to respond
    if (req.url?.startsWith('/health')) {
      return res.status(200).json({ ok: true, db: 'unavailable' });
    }
    return res.status(500).send('Internal Server Error');
  }
  return app(req, res);
}
