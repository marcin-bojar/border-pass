const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BorderSchema = new Schema({
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
    default: Date.now(),
  },
});

module.exports = BorderPass = mongoose.model('border', BorderSchema);
