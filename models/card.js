const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  deadline : {
    type: String,
    required: false,
  },
  image: [{
    type: String,
    required: true,
    
  }],
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 10000,
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
    enum:["Покупка", "Продажа", "Аренда"]
  },
  floor: {
    type: String,
    required: false,
  },
  rooms: {
    type: String,
    required: true,
  },
  cadastre: {
    type: String,
    required: false,
  },
  balcony: {
    type: Boolean,
    required: false,
  },
  elevator: {
    type: Boolean,
    required: false,
  },
  repair: {
    type: Boolean,
    required: true,
  },
  metro: {
    type: String,
    required: false,
  },
  totalarea: {
    type: String,
    required: true,
  },
  roomarea: {
    type: String,
    required: false,
  },
  kitchenarea: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  commission: {
    type: String,
    required: false,
  },
  material: {
    type: String,
    required: false,
  },
  jurstatus: {
    type: String,
    required: false,
  },
  plotarea: {
    type: String,
    required: false,
  },
  active: {
    type: Boolean,
    default: true,
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

  id: {
    type: mongoose.Schema.Types.ObjectId,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  
});

module.exports = mongoose.model('card', cardSchema);
