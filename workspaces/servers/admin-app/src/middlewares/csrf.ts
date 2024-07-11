export const csrfMiddleware = async (ctx, next) => {
  const session = ctx.get('session');
  let csrfToken = session.get('csrfToken');
  if (!csrfToken) {
    csrfToken = Math.random().toString(36).substring(2);
    session.set('csrfToken', csrfToken);
  }
  console.log('csrfToken', csrfToken);
  return next();
};
