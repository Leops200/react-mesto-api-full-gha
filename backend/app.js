require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const validationErrs = require('celebrate').errors;
const cookieParser = require('cookie-parser');
const router = require('./routes/index');
const errProcess = require('./middlewares/errorsProcess');
const cors = require('./middlewares/cors');
const { errLog, reqLog } = require('./middlewares/logger');

// =====================================================
// Слушаем 3000 порт
// const { PORT = 3000 } = process.env;
const PORT = process.env.PORT || 3001;
const DATA_BASE = process.env.DATA_BASE || 'mongodb://127.0.0.1/mestodb';

const app = express();

mongoose.connect(DATA_BASE);

app.use(cors);
/*
app.post('/signup', (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  User.create({
    name, about, avatar, email, password,
  })
    .then((user) => res.status(200).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
      password: user.password,
    }))
    .catch((err) => res.status(422).send({ message: err.message, err }));
}); */

/*
console.log('-start test');
console.log(req.headers);
console.log('- end test -');
res.send(req.headers); */

/*
app.use((req, res, next) => {
  req.user = {
    _id: '644a52787e7f73995231f3d3',
  };

  next();
});
*/
// =============================================
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('crash-test');
  }, 0);
});
// =============================================

app.use(express.json());
app.use(cookieParser());
app.use(reqLog);
app.use('/', router);
app.use(errLog);
app.use(validationErrs());
app.use(errProcess);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
