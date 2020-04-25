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
  lat: {
    type: Number,
    required: true,
  },
  lon: {
    type: Number,
    required: true,
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

const Subscription = (module.exports = mongoose.model(
  'subscription',
  subscriptionSchema
));
module.exports.get = (callback, limit) => {
  Subscription.find(callback).limit(limit);
};
