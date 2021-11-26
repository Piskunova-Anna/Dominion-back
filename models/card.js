const mongoose = require('mongoose');
const validator = require('validator');
const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  image: [{
    type: String,
    required: true,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
    },
  }],
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 600,
  },
  price: {
    type: String,
    required: true,
  },
  adress: {
    type: String,
    required: true,
  },
  transaction: {
    type: String,
    required: true,
    enum:["покупка", "продажа", "аренда"]
  },
  floor: {
    type: Number,
    required: true,
  },
  rooms: {
    type: Number,
    required: true,
  },
  cadastre: {
    type: String,
    required: true,
  },
  balcony: {
    type: String,
    required: true,
  },
  elevator: {
    type: String,
    required: true,
  },
  repair: {
    type: String,
    required: true,
  },
  metro: {
    type: String,
    required: true,
  },
  totalarea: {
    type: String,
    required: true,
  },
  kitchenarea: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],

  createdAt: {
    type: Date,
    default: Date.now,
  },
  
});

module.exports = mongoose.model('card', cardSchema);
