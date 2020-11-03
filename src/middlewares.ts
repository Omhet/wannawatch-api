import { ErrorRequestHandler, RequestHandler } from "express";

export const requestLogger: RequestHandler = (req, _res, next) => {
  console.log('\n');
  console.log('Request:');
  console.log('---');
  console.log('Method: ', req.method);
  console.log('Path: ', req.path);
  console.log('Body: ', req.body);
  console.log('---');
  next();
};

export const unknownEndpoint: RequestHandler = (_req, res, next) => {
    res.status(404).json({ error: 'unknown endpoint' });
    next();
};

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.error(error.message);

  // Not null constrain violation
  if (error.code === '23502') {
    return res.status(400).end();
  }

  return res.status(500).end();
}