import { ErrorRequestHandler, RequestHandler } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';
import logger from './logger';

export const requestLogger: RequestHandler = (req, _res, next) => {
    logger.info('\n');
    logger.info('Request:');
    logger.info('---');
    logger.info('Method: ', req.method);
    logger.info('Path: ', req.path);
    logger.info('Body: ', req.body);
    logger.info('---');
    next();
};

export const unknownEndpoint: RequestHandler = (_req, res, next) => {
    res.status(404).json({ error: 'unknown endpoint' });
    next();
};

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    logger.error(error.message);
    logger.error(error);

    if (/username.+already exists/.test(error.detail)){
        return res.status(400).json({
            error: 'user_exists'
        });
    }

    // Not null constrain violation
    if (error.code === '23502') {
        return res.status(400).end();
    }

    return res.status(500).end();
};

export const userAuth: RequestHandler = async (req, res, next) => {
    const { session } = req;
    if (!(session && session.userId)) {
        return next();
    }

    const userRepo = getRepository(User);
    // @ts-ignore
    const user = await userRepo.findOne({
      relations: ['movies'],
      where: {
        id: session.userId
      }
    });
    if (!user) {
        return next();
    }
  
    req.user = user;
    res.locals.user = user;

    next();
};

export const loginRequired: RequestHandler = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Auth required ' });
    }

    next();
};
