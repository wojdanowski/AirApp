const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const { locationPoint } = require('./nestedSchemas');

const normaliseHours = (hours) => {
  return Array.from(new Set(hours)) // usunąć duplikaty
    .map((h) => Math.floor(h)) // zamienić na integer
    .sort(); // posortować
};

const subscriptionSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  location: locationPoint,
  hours: {
    // TODO: przerobić
    type: [Number],
    required: true,
    set: (hours) => normaliseHours(hours),
  },
  subscription_date: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: false,
  },
  token: String,
});

subscriptionSchema.methods.createManageToken = function () {
  const manageToken = crypto.randomBytes(32).toString('hex');

  this.token = crypto.createHash('sha256').update(manageToken).digest('hex');

  return manageToken;
};

subscriptionSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('subscription', subscriptionSchema);
