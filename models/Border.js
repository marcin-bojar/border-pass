const mongoose = require('mongoose');
const { Schema } = mongoose;

const BorderSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ['tripStart', 'tripEnd', 'borderPass'],
    },
    from: {
      type: String,
      required: () => this.type === 'borderPass',
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
      default: Date.now,
    },
  },
  { toJSON: { virtuals: true } }
);

BorderSchema.virtual('timestamp_ms').get(function () {
  return this.timestamp.getTime();
});

module.exports = BorderSchema;
