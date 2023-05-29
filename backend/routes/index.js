const router = require('express').Router();

const users = require('./users');
const cards = require('./cards');
const notFound = require('./notFound');
const signin = require('./signin');
const signup = require('./signup');
const auth = require('../middlewares/auth');
// добавил краш-тест в app.js
/*
Вы меня извините, что не все выполнил "можно лучше", тут не до хорошего,
успеть бы с основным разобраться. Но я себе все замечания сохраняю,
разбираюсь с ними по мере возможностей, спасибо Вам за них.
Вообще спасибо Вам за Ваш труд, без него нам было б сложно
чему-либо научиться.
*/

router.use('/users', auth, users);
router.use('/cards', auth, cards);
router.use('/signin', signin);
router.use('/signup', signup);
router.use('*', notFound);

module.exports = router;
