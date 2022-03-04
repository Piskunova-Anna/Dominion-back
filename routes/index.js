const router = require('express').Router();
const userRoter = require('./users');
const cardsRouter = require('./cards');
const CommercialCardRouter = require('./commercial');
const auth = require('../middlewares/auth');
const { createUser, login, logout } = require('../controllers/user');
const { findAllCard, findIdCard, findAllId } = require('../controllers/card');
const { findAllCommercialCard } = require('../controllers/commercial');
const { validateSignUp, validateSignIn } = require('../middlewares/validator');
const UserError = require('../errors/UserError');

router.post('/signup', validateSignUp, createUser);
router.post('/signin', validateSignIn, login);
router.post('/signout', logout);
router.get('/cards', findAllCard);
router.get('/commercial', findAllCommercialCard);
router.get('/idcards', findAllId);
router.get('/cards/:cardId', findIdCard);
router.use(auth);
router.use('/profile/cards', cardsRouter);
router.use('/profile/commercial', CommercialCardRouter);
router.use('/users', userRoter);


router.use('*', (req, res, next) => {
  next(new UserError(404, 'Запрашиваемый ресурс не найден.'));
});

module.exports = router;