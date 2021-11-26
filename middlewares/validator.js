const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateId = Joi.string().length(24).hex();
const validateURL = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new Error('Неправильный формат ссылки');
  }
  return value;
};


const validateSignIn = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateUpDateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

   
const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    image: Joi.array().items(Joi.string().custom(validateURL)).required(),
    description: Joi.string().required().min(5).max(600),
    adress: Joi.string().required(),
    price: Joi.number().required(),
    rooms: Joi.number().required(),
    cadastre: Joi.string().required(),
    transaction: Joi.string().required(),
    floor: Joi.number().required(),
    metro: Joi.string().required(),
    balcony: Joi.string().required(),
    elevator: Joi.string().required(),
    repair: Joi.string().required(),
    totalarea: Joi.number().required(),
    kitchenarea: Joi.number().required(),
  }),
});

const validateDeleteCard = celebrate({
  params: Joi.object().keys({
    cardId: validateId,
  }),
});

module.exports = {
  validateUpDateUser,
  validateSignUp,
  validateSignIn,
  validateCreateCard,
  validateDeleteCard,
};
