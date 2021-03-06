const mongoose = require('mongoose');
const BorderSchema = require('./Border').BorderSchema;
const CountrySchema = require('./Country').CountrySchema;
const Schema = mongoose.Schema;
const defaultCountries = require('../helpers/defaultCountries');

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
  company: {
    type: Object,
    default: {
      companyName: '',
      companyEmail: '',
    },
  },
});

module.exports = User = mongoose.model('user', UserSchema);
