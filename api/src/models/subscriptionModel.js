const { locationPoint } = require('./nestedSchemas');

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
  location: locationPoint,
});

subscriptionSchema.index({ location: '2dsphere' });

const Subscription = (module.exports = mongoose.model(
  'subscription',
  subscriptionSchema
));
module.exports.get = (callback, limit) => {
  Subscription.find(callback).limit(limit);
};
