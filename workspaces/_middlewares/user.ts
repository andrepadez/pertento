import { db, eq, Users } from 'pertentodb';
import { verify } from 'jwt';
const { JWT_SECRET } = process.env;

export const userMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).send('UNAUTHORIZED');
  const [, token] = authorization.split(' ');
  if (!token) return res.status(401).send('UNAUTHORIZED');

  try {
    const user = await verify(token);
    if (!user) return res.status(401).send('UNAUTHORIZED');
    if (user.role === 'Member' && req.method !== 'GET') return res.status(401).send('UNAUTHORIZED');
    req.user = user;
    return next();
  } catch (ex) {
    console.log('error', ex);
    return res.status(401).send('UNAUTHORIZED');
  }
};
