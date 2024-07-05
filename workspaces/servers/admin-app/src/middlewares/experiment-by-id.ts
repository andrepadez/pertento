export const experimentByIdMiddleware = async (ctx, next) => {
  console.log('experimentByIdMiddleware');
  return next();
};
