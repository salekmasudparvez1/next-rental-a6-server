
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import authRouter from './app/modules/Auth/auth.routes';
import landloardRouter from './app/modules/landloard/landloard.routes';
import tenentRouter from './app/modules/tenent/tenent.routes';



const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: ['http://localhost:3000','http://localhost:5000'], credentials: true }));

// application routes
app.use('/api/auth',authRouter);
app.use('/api/landlords',landloardRouter);
app.use('/api/tenants',tenentRouter);

// lightweight healthcheck (no DB access)
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ ok: true });
});


app.get('/', (req: Request, res: Response) => {
  res.send('Server is running !');
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;