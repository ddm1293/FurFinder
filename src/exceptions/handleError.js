export function handleError(err, res, exception, errorCode) {
  console.error(err);
  if (!exception) {
    res.status(400).json({ error: err });
  }
  if (err instanceof exception) {
    res.status(errorCode).json({ error: { errorType: err.type, errorMessage: err.message } });
  } else {
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
}
