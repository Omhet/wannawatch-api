import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import { errorHandler, requestLogger, unknownEndpoint } from './middlewares';
import { createConnection } from 'typeorm';
import { User } from './db/entities/User';
import { ormConfig } from './db/orm-config';
import logger from './utils/logger';
import config from './utils/config';


createConnection(ormConfig)
  .then((connection) => {
    const app = express();
    app.use(cors(), express.json(), requestLogger);

    const userRepo = connection.getRepository(User);

    app.get('/users', async (_req, res) => {
      const users = await userRepo.find();
      res.json(users);
    });

    app.get('/users/:id', (req, res) => {
      // here we will have logic to return user by id
    });

    app.post('/users', async (req, res) => {
      const user = await userRepo.create(req.body);
      const result = await userRepo.save(user);
      res.send(result);
    });

    app.put('/users/:id', (req, res) => {
      // here we will have logic to update a user by a given user id
    });

    app.delete('/users/:id', (req, res) => {
      // here we will have logic to delete a user by a given user id
    });

    app.use(unknownEndpoint);
    app.use(errorHandler);

    app.listen(config.PORT, () => logger.info(`Server started on ${config.PORT}`));
  })
  .catch((error) => {
    logger.error(error);
  });
