const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CountrySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = Country = mongoose.model('country', CountrySchema);
