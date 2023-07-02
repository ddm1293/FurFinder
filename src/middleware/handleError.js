import { InvalidQueryException } from '../exceptions/threadException.js';

export const handleError = (err, req, res, next) => {
  console.error(err);

  if (err instanceof InvalidQueryException) {
    res.status(err.statusCode)
      .send({ errorMessage: err.message, errors: err.errors, errorType: err.type });
    return;
  }

  if (err.statusCode) {
    res.status(err.statusCode)
      .send({ errorMessage: err.message, errorType: err.type });
    return;
  }

  res.status(500).json({ errorMessage: 'Unexpected Error', err });
};
