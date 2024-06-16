const { SignJWT, jwtVerify } = require('jose');
// // const { transport } = require('emailer');

const encoder = new TextEncoder();
const { PORT, JWT_SECRET } = process.env;
const SECRET = encoder.encode(JWT_SECRET);

module.exports.sign = async (payload, expiration = '30d') => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(expiration)
    .sign(SECRET);
};

module.exports.verify = async (token) => {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload;
  } catch (ex) {
    return null;
  }
};
