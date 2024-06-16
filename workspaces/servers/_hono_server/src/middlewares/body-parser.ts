export const bodyParser = () => async (c, next) => {
  if (!['POST', 'PUT', 'PATCH'].includes(c.req.method)) return next();
  try {
    c.body = await c.req.json();
  } catch (ex) {
  } finally {
    return next();
  }
};
