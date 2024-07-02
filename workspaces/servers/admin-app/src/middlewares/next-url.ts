const { BUILD_ENV } = process.env;
const isProduction = BUILD_ENV === 'production';

export const nextUrlMiddleware = async (ctx, next) => {
  const url = new URL(ctx.req.url);
  url.protocol = isProduction ? 'https' : 'http';
  ctx.set('nextUrl', url);
  return next();
};
