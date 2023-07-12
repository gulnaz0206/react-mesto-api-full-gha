const jwt = require('jsonwebtoken');
const Unauthorized = require('../../src/errors/Unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { cookie } = req.headers;
  if (!cookie) {
    return next(new Unauthorized('Необходима авторизация'));
  }
  const token = cookie.replace('; foo=bar', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    return next(new Unauthorized('Необходима авторизация'));
  }
  req.user = payload;
  next();
};
