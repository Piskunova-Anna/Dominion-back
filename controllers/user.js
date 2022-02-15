const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');
const UserError = require('../errors/UserError');

const createUser = (req, res, next) => {
  const {
    name, email, surname, phone, agency
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name, email, surname, phone, agency, password: hash,
    }))
    .then((user) => {
  res.status(201).send({ _id: user._id, email: user.email });
    })
    // данные не записались, вернём ошибку
    .catch((err) => {
  if (err.name === 'ValidationError') {
    next(new NewError(400));
  } else if (err.name === 'MongoError' && err.code === 11000) {
    next(new NewError(409));
  } else {
    next(new NewError(500));
  }
    });
  };

// Вход в систему
const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      if(!user.access) {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        //sameSite: 'none',
        //secure: true,
      })
      .send({ 
        succes: 'ok',
        message: 'Авторизация прошла успешно' })
    } else {
      res.send({ 
        succes: 'no',
        message: 'Ваша учетная запись не подтверждена. Дождитесь подтверждения!' })
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new UserError(400));
      } else if (err.name === 'Error') {
        next(new UserError(401));
      } else {
        next(new UserError(500));
      }
    });
};

  // Выход из системы
const logout = (req, res) => {
    res.clearCookie('jwt', {
      sameSite: 'none',
      secure: true,
    });
    res.status(201).send(
      { message: 'Вы вышли из системы' },
    );
  };


  // Поиск пользователей
const findUser = (req, res, next) => {
  User.find({})
    .then((user) => res.send(user))
    .catch(() => next(new UserError(500)));
};


  // Поиск пользователя профиля
const findCurrent = (req, res, next) => {
    User.findById(req.user._id)
      .then((user) => {
        res.status(201).send(user);
      })
      .catch(() => next(new UserError(500)));
  };

// Изменение данных пользователя
const updateUser = (req, res, next) => {
    const { name, email, surname, phone, agency } = req.body;
    const id = req.user._id;
    User.findByIdAndUpdate(
      id,
      { name, email, surname, phone, agency },
      { new: true, runValidators: true },
    )
      .orFail(new Error('Error'))
      .then((user) => res.send(user))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new UserError(400));
        } else if (err.name === 'Error') {
          next(new UserError(400));
        } else {
          next(new UserError(500));
        }
      });
  };

  // Изменение прав доступа пользователя
const updateAccessUser = (req, res, next) => {
  const { access } = req.body;
  const {userId } = req.params;
  const admin = req.user
  User.findByIdAndUpdate(
    userId,
    { access },
    { new: true, runValidators: true },
  )
    .orFail(new Error('Error'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new UserError(400));
      } else if (err.name === 'Error') {
        next(new UserError(400));
      } else {
        next(new UserError(500));
      }
    });
};



  module.exports = {
    createUser,
    login,
    logout,
    findUser,
    findCurrent,
    updateUser,
    updateAccessUser
  };
