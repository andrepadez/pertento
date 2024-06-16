const jwt = require('jsonwebtoken');
import * as errors from 'custom-errors';

const { JWT_SECRET } = process.env;

export const sign = async (payload, expiration = '30d') => {
  return new Promise((resolve, reject) => {
    const data = { ...payload, exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60 };
    jwt.sign(data, JWT_SECRET, (err, token) => {
      if (err) throw err;
      resolve(token);
    });
  });
};

export const verify = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, function (err, decoded) {
      if (err) throw errors.UNAUTHORIZED();
      resolve(decoded);
    });
  });
};
