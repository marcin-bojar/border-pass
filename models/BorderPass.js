const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BorderPassSchema = new Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: new Date(),
  },
});

module.exports = BorderPass = mongoose.model('border-pass', BorderPassSchema);
