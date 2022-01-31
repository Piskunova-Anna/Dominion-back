const Card = require('../models/card');
const CardError = require('../errors/CardError');
const User = require('../models/user');

// Создание карточек квартир
const createCard = (req, res, next) => {
  const {
    name,
    image,
    description,
    price,
    adress,
    transaction,
    floor,
    rooms,
    cadastre,
    balcony,
    elevator,
    repair,
    metro,
    totalarea,
    kitchenarea,
    district,
    commission,
  } = req.body;

  
const owner = req.user._id;

Card.create({
    name,
    image,
    description,
    price,
    adress,
    transaction,
    floor,
    rooms,
    cadastre,
    balcony,
    elevator,
    repair,
    metro,
    totalarea,
    kitchenarea,
    district,
    commission,
    owner,
    
  })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        console.log(err)
        next(new CardError(400));
      } else {
        next(new CardError(500));
      }
    });
};

// Поиск созданных пользователем карточек
const findCard = (req, res, next) => {
    const current = req.user._id;
    Card.find({ owner: current })
      .then((card) => res.send(card))
      .catch(() => next(new CardError(500)));
  };

  // Поиск всех созданных карточек
const findAllCard = (req, res, next) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch(() => next(new CardError(500)));
};

  // удаление карточек
const deleteCard = (req, res, next) => {
    const { cardId } = req.params;
     
    Card.findById(cardId)
    .then((card) => {
      User.findById(req.user._id)
      .then((user) => {
        if(user.admin || req.user._id === String(card.owner)) {
          Card.findByIdAndRemove(cardId)
          .orFail(new Error('Error'))
          .then((data) => res.send(data))
          .catch((err) => {
            if (err.name === 'CastError') {
              next(new CardError(400));
            } else if (err.name === 'Error') {
              next(new CardError(404));
            } else {
              next(new CardError(500));
            }
          })
        } else {
          next(new CardError(403));
        }
      })
      .catch(() => next(new CardError(500)));
    })

  };


// Редактирование карточек
const updateCard = (req, res, next) => {
  const { 
    name,
    active,
    image,
    description,
    price,
    adress,
    transaction,
    floor,
    rooms,
    cadastre,
    balcony,
    elevator,
    repair,
    metro,
    totalarea,
    district,
    commission,
    kitchenarea, } = req.body;
  const { cardId } = req.params;
 
  Card.findById(cardId)
  .then((card) => {
    User.findById(req.user._id)
    .then((user) => {
      console.log(req.body)
      console.log(cardId)
      if(user.admin || req.user._id === String(card.owner)) {
        Card.findByIdAndUpdate(cardId,
          {name,
          active,
          image,
          description,
          price,
          adress,
          transaction,
          floor,
          rooms,
          cadastre,
          balcony,
          elevator,
          repair,
          metro,
          totalarea,
          commission,
          district,
          kitchenarea },
          { new: true, runValidators: true },
        )
        .orFail(new Error('Error'))
        .then((card) => res.send(card))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new CardError(400));
          } else if (err.name === 'Error') {
            next(new CardError(400));
          } else {
            next(new CardError(500));
          }
        })
      } else {
        next(new CardError(403));
      }
    })
    .catch(() => next(new CardError(500)))
})
.catch(() => next(new CardError(500)))
}

  module.exports = {
    createCard,
    findCard,
    deleteCard,
    findAllCard,
    updateCard
  };