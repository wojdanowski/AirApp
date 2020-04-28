const mongoose = require('mongoose');

const normaliseHours = (hours) => {
  return Array.from(new Set(hours)) // usunąć duplikaty
    .map((h) => Math.floor(h)) // zamienić na integer
    .sort(); // posortować
};

const subscriptionSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  //TODO: duplikat z stationModel
  location: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number], // lon, lat
      required: true,
    },
  },
  hours: {
    type: [Number],
    required: true,
    set: (hours) => normaliseHours(hours),
  },
  subscription_date: {
    type: Date,
    default: Date.now,
  },
});

subscriptionSchema.index({ location: '2dsphere' });

const Subscription = (module.exports = mongoose.model(
  'subscription',
  subscriptionSchema
));
module.exports.get = (callback, limit) => {
  Subscription.find(callback).limit(limit);
};
