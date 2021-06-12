const mongoose = require('mongoose');
const { Schema } = mongoose;

const ArchivedTripEventSchema = Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ['tripStart', 'tripEnd', 'borderPass', 'place'],
    },
    from: {
      type: String,
      required: () => this.type === 'borderPass',
    },
    to: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: () => this.type === 'place',
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
    _user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    createdAt: {
      type: Date,
      expires: '180d',
      default: Date.now,
    },
  },
  { toJSON: { virtuals: true } }
);

ArchivedTripEventSchema.virtual('timestamp_ms').get(function () {
  return this.timestamp.getTime();
});

module.exports = ArchivedTripEvent = mongoose.model('archived_trip_event', ArchivedTripEventSchema);
