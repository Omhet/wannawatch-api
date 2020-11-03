import { ErrorRequestHandler, RequestHandler } from "express";
import logger from "./utils/logger";

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

  // Not null constrain violation
  if (error.code === '23502') {
    return res.status(400).end();
  }

  return res.status(500).end();
}