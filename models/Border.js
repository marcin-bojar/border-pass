const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BorderSchema = new Schema(
  {
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
      default: Date.now,
    },
  },
  { toJSON: { virtuals: true } }
);

BorderSchema.virtual('timestamp_ms').get(function () {
  return this.timestamp.getTime();
});

Border = mongoose.model('border', BorderSchema);

module.exports = {
  Border,
  BorderSchema,
};
