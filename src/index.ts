import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import { errorHandler, requestLogger, unknownEndpoint } from './utils/middlewares';
import { createConnection } from 'typeorm';
import { ormConfig } from './orm-config';
import logger from './utils/logger';
import config from './utils/config';
import { userRouter } from './controllers/users';

createConnection(ormConfig)
  .then(() => {
    const app = express();
    app.use(cors(), express.json(), requestLogger);

    app.use('/users', userRouter);

    app.use(unknownEndpoint);
    app.use(errorHandler);

    app.listen(config.PORT, () => logger.info(`Server started on ${config.PORT}`));
  })
  .catch((error) => {
    logger.error(error);
  });
