import express from 'express';
import cors from 'cors';
import sessions from 'client-sessions';
import {
    errorHandler,
    requestLogger,
    unknownEndpoint,
    userAuth,
} from './utils/middlewares';
import { userRouter } from './controllers/users';
import config from './utils/config';
import { loginRouter } from './controllers/login';

const app = express();
app.use(cors(), express.json(), requestLogger);

app.use(
    sessions({
        cookieName: 'session',
        secret: config.COOKIE_SECRET!,
        duration: 30 * 60 * 1000,
    })
);

app.use('/login', loginRouter);
app.use(userAuth);

app.use('/users', userRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
