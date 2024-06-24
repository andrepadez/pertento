export const bodyParser = () => async (c, next) => {
  const contentType = c.req.header('Content-Type');
  if (!['POST', 'PUT', 'PATCH'].includes(c.req.method)) {
    c.req.body = {};
    return next();
  }
  try {
    if (contentType === 'application/json') {
      c.req.body = await c.req.json();
    }
    if (contentType === 'application/x-www-form-urlencoded') {
      c.req.body = await c.req.parseBody();
    }
  } catch (ex) {
  } finally {
    c.req.body = c.req.body || {};
    return next();
  }
};
