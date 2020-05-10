const mongoose = require('mongoose');
const { locationPoint } = require('./nestedSchemas');

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

module.exports = mongoose.model('subscription', subscriptionSchema);
