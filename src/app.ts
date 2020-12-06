import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import sessions from 'express-session';
import {
    errorHandler,
    requestLogger,
    unknownEndpoint,
    userAuth,
} from './utils/middlewares';
import { currentUserRouter } from './controllers/currentUser';
import config from './utils/config';
import { authRouter } from './controllers/auth';

const app = express();
app.use(helmet(), cors({ origin: true, credentials: true }), express.json(), requestLogger);

app.use(
    sessions({
        name: 'session',
        secret: config.COOKIE_SECRET!,
        resave: false,
        saveUninitialized: true,
        cookie: {
            sameSite: 'none',
            secure: true,
            httpOnly: true,
            maxAge: 30 * 60 * 1000
        }
    })
);

app.use('/auth', authRouter);
app.use(userAuth);

app.use('/me', currentUserRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
