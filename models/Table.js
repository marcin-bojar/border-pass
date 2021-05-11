const mongoose = require('mongoose');
const { Schema } = mongoose;

const TableSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    required: true,
    enum: ['sent', 'archived'],
  },
  html: {
    type: String,
    required: true,
  },
  borders: {
    type: Array,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: '180d',
    default: Date.now,
  },
});

module.exports = Table = mongoose.model('table', TableSchema);
