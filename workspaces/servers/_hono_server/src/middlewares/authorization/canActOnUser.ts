import { db, eq, Users } from 'pertentodb';
import * as errors from 'custom-errors';

export const canActOnUser = async (c, next) => {
  if (c.user.role === 'Super Admin') return next();
  const { userId } = c.req.param();
  const user = await db.query.Users.findFirst({
    where: eq(Users.id, userId),
    with: { company: true },
  });

  if (c.user.companyId !== user.companyId) {
    throw errors.FORBIDDEN();
  }
  if (!['Admin', 'Owner'].includes(c.user.role)) {
    throw errors.FORBIDDEN();
  }
  return next();
};
