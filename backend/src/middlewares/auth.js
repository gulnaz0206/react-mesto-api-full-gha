const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
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
  // console.log(req.user);
  // console.log(req.body);
  next();
};
