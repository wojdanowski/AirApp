const mongoose = require('mongoose');

function normaliseHours(hours) {
  // usunąć duplikaty
  const uniqueHours = Array.from(new Set(hours));
  // zamienić na integery
  const integerHours = uniqueHours.map((h) => Math.floor(h));
  // posortować
  integerHours.sort();

  return integerHours;
}

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
module.exports.get = function (callback, limit) {
  Subscription.find(callback).limit(limit);
};
