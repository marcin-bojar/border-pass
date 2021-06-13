const mongoose = require('mongoose');
const BorderSchema = require('./Border');
const CountrySchema = require('./Country');
const defaultCountries = require('../helpers/defaultCountries');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
  borders: [BorderSchema],
  countries: {
    type: [CountrySchema],
    default: defaultCountries,
  },
  places: {
    type: [CountrySchema],
  },
  company: {
    type: Object,
    default: {
      companyName: '',
      companyEmail: '',
    },
  },
  preferences: {
    type: Object,
    default: {
      showPlaces: true,
    },
  },
});

module.exports = User = mongoose.model('user', UserSchema);
