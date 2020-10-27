export const requestLogger = (req, res, next) => {
  console.log('\n');
  console.log('Request:');
  console.log('---');
  console.log('Method: ', req.method);
  console.log('Path: ', req.path);
  console.log('Body: ', req.body);
  console.log('---');
  next();
};

export const unknownEndpoint = (req, res, next) => {
    res.status(404).json({ error: 'unknown endpoint' });
    next();
};
