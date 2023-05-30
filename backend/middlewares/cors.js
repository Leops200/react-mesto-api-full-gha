const allowedCors = [
  'https://mymesto15front.nomoredomains.monster',
  'http://mymesto15front.nomoredomains.monster',
  'http://mesto.ld-webdev.nomoredomains.monster',
  'https://mesto.ld-webdev.nomoredomains.monster',
  'http://localhost:3000',
  'http://localhost:3001',
  'https://158.160.7.219',
  'http://158.160.7.219',
  'http://158.160.53.34',
  'https://158.160.53.34',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  return next();
};
