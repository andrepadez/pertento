import { db, eq, Users } from 'pertentodb';
import { verify } from 'jwt';
import * as errors from 'custom-errors';
const { JWT_SECRET } = process.env;

export const userMiddleware = async (c, next) => {
  const { authorization } = c.req.header();

  if (!authorization) throw errors.UNAUTHORIZED();
  const [, token] = authorization.split(' ');
  if (!token) throw errors.UNAUTHORIZED();

  try {
    const user = await verify(token);
    if (!user) throw errors.UNAUTHORIZED();
    if (user.role === 'Member' && c.req.method !== 'GET') throw errors.UNAUTHORIZED();
    c.user = user;
    return next();
  } catch (ex) {
    throw errors.UNAUTHORIZED();
  }
};
