const mongoose = require('mongoose');
const validator = require('validator');

const commercialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
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
  access : {
    type: String,
    required: false,
  },
  infrastructure: {
    type: String,
    required: false,
  },
  parking : {
    type: Boolean,
    required: false,
  },
  entrance: {
    type: String,
    required: false,
  },
  metro: {
    type: String,
    required: true,
  },
  totalarea: {
    type: String,
    required: true,
  },
  commission: {
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

  createdAt: {
    type: Date,
    default: Date.now,
  },
  
});

module.exports = mongoose.model('commercial', commercialSchema);