const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BorderSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ['delegationStart', 'delegationEnd', 'borderPass'],
    },
    from: {
      type: String,
      required: () => this.type === 'borderPass',
    },
    to: {
      type: String,
      required: () => this.type === 'borderPass',
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
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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
