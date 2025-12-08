import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { Request, Response } from 'express';

async function connectDatabase() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port} `)
    })
  } catch (err) {
    console.error(`❌ Database Connection Error:`, err);
  }
}

connectDatabase();

export default function handler(req: Request, res: Response) {
  return app(req, res);
}
