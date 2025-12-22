
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import authRouter from './app/modules/auth/auth.routes';
import adminRouter from './app/modules/admin/admin.routes';
import landloardRouter from './app/modules/landloard/landloard.routes';
import tenentRouter from './app/modules/tenent/tenent.routes';
import payRouter from './app/modules/pay/pay.routes';



const app: Application = express();

//parsers
app.use(express.json({
  verify: (req: any, _res, buf) => {
    req.rawBody = buf;
  },
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, verify: (req: any, _res, buf) => { req.rawBody = buf; } }));

app.use(cors({ origin: ['http://localhost:3000','http://localhost:5000','https://findbasa.vercel.app','https://findbasa.netlify.app'], credentials: true }));

// application routes
app.use('/api/auth',authRouter);
app.use('/api/admin',adminRouter);
app.use('/api/landlords',landloardRouter);
app.use('/api/tenants',tenentRouter);
app.use('/api/pay',payRouter);



app.get('/', (req: Request, res: Response) => {
  res.send('Server is running !');
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;