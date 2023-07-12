const jsonWebToken = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  if (!token) {
    next(new UnauthorizedError('Пользователь не авторизирован'));
  } else {
    try {
      payload = jsonWebToken.verify(token, 'SECRET');
    } catch (err) {
      next(err);
    }
  }
  req.user = payload;
  next();
};

module.exports = auth;
