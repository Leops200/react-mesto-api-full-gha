const jwt = require('jsonwebtoken');

const Unauthorized = require('../errors/Unauthorized');

const { NODE_ENV, SECRET_KEY } = process.env;

module.exports = (req, res, next) => {
  // console.log('auth run');
  // console.log(req.cookies.jwt);

  /* это для авторизации в куках
  const token = req.cookies.jwt;
  */
  const auth = req.headers;
  // console.log('token in auth:');
  // console.log(token);
  if (!auth || !auth.startsWith('Bearer ')) {
    return next(new Unauthorized('Авторизуйтесь (!token)'));
  }
  const token = auth.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? SECRET_KEY : 'dev-secret-key');
  } catch (err) {
    return next(new Unauthorized('Авторизуйтесь'));
  }
  req.user = payload;
  return next();
};
