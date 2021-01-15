const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CountrySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

Country = mongoose.model('country', CountrySchema);

module.exports = {
  CountrySchema,
  Country,
};
