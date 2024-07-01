const { BUILD_ENV } = process.env;
const isProduction = BUILD_ENV === 'production';

export const nextUrlMiddleware = async (c, next) => {
  const url = new URL(c.req.url);
  url.protocol = isProduction ? 'https' : 'http';
  c.set('nextUrl', url);
  return next();
};
