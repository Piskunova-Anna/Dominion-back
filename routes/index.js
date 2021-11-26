const router = require('express').Router();
const userRoter = require('./users');
const cardsRouter = require('./cards');
const auth = require('../middlewares/auth');
const { createUser, login, logout } = require('../controllers/user');
const { findAllCard } = require('../controllers/card');
const { validateSignUp, validateSignIn } = require('../middlewares/validator');
const UserError = require('../errors/UserError');

router.post('/signup', validateSignUp, createUser);
router.post('/signin', validateSignIn, login);
router.post('/signout', logout);
router.get('/cards', findAllCard);
router.use(auth);
router.use('/profile/cards', cardsRouter);
router.use('/users', userRoter);


router.use('*', (req, res, next) => {
  next(new UserError(404, 'Запрашиваемый ресурс не найден.'));
});

module.exports = router;