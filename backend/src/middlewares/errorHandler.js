export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Error interno del servidor";

  console.error(`[${req.method}] ${req.url} - ${status}: ${message}`);

  res.status(status).json({ error: message, status });
};