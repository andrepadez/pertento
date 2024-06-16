export const originMiddleware = (c, next) => {
  const headerOrigin = c.req.header('origin');
  c.origin = headerOrigin;
  return next();
};
