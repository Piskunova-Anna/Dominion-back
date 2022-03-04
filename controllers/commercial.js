const Commercial = require('../models/commercial');
const CardError = require('../errors/CardError');
const User = require('../models/user');

// Создание карточек квартир
const createCommercialCard = (req, res, next) => {
  const {
    name,
    access,
    image,
    description,
    price,
    adress,
    transaction,
    floor,
    infrastructure,
    parking,
    entrance,
    metro,
    totalarea,
    commission,
    active,
  } = req.body;

  
const owner = req.user._id;

Commercial.create({
  name,
  access,
  image,
  description,
  price,
  adress,
  transaction,
  floor,
  infrastructure,
  parking,
  entrance,
  metro,
  totalarea,
  commission,
  active,
    
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
const findCommercialCard = (req, res, next) => {
    const current = req.user._id;
    Commercial.find({ owner: current })
      .then((card) => res.send(card))
      .catch(() => next(new CardError(500)));
  };

  // Поиск всех созданных карточек
const findAllCommercialCard = (req, res, next) => {
  Commercial.find({})
    .then((card) => res.send(card))
    .catch(() => next(new CardError(500)));
};

// удаление карточек
const deleteCommercialCard = (req, res, next) => {
    const { cardId } = req.params;
    Commercial.findById(cardId)
    .then((card) => {
      User.findById(req.user._id)
      .then((user) => {
        if(user.admin || req.user._id === String(card.owner)) {
          Commercial.findByIdAndRemove(cardId)
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
const updateCommercialCard = (req, res, next) => {
  const {
    name,
   access,
   image,
  description,
  price,
  adress,
  transaction,
  floor,
  infrastructure,
  parking,
  entrance,
  metro,
  totalarea,
  commission,
  active,
  } = req.body;

  const { cardId } = req.params;

  Commercial.findById(cardId)
  .then((card) => {
    User.findById(req.user._id)
    .then((user) => {
      if(user.admin || req.user._id === String(card.owner)) {
        Commercial.findByIdAndUpdate(cardId, {
          name,
          access,
          image,
          description,
          price,
          adress,
          transaction,
          floor,
          infrastructure,
          parking,
          entrance,
          metro,
          totalarea,
          commission,
          active,
        },
          { new: true, runValidators: true },
        )
        .orFail(new Error('Error'))
        .then((card) =>res.send(card))
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
    .catch((err) => new CardError(500));
  })
};


  module.exports = {
    createCommercialCard,
    findCommercialCard,
    deleteCommercialCard,
    findAllCommercialCard,
    updateCommercialCard,
  };