import 'reflect-metadata';
import 'express-async-errors';
import http from 'http';
import { createConnection } from 'typeorm';
import { ormConfig } from './orm-config';
import logger from './utils/logger';
import config from './utils/config';
import app from './app';

(async () => {
  try {
    await createConnection(ormConfig);
    logger.info('Connected to DB');
  } catch (error) {
    logger.error('Failed to connect to DB', error.message);
    return;
  }

  try {
    const server = http.createServer(app);
    server.listen(config.PORT, () =>
      logger.info(`Server started on ${config.PORT}`)
    );
  } catch (error) {
    logger.error('Failed to start server', error.message);
  }
})();
