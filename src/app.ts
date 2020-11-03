import express from 'express';
import cors from 'cors';
import {
  errorHandler,
  requestLogger,
  unknownEndpoint,
} from './utils/middlewares';
import { userRouter } from './controllers/users';

const app = express();
app.use(cors(), express.json(), requestLogger);

app.use('/users', userRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
