const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const { locationPoint, subscriptionTime } = require('./nestedSchemas');

const subscriptionSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide email'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  location: locationPoint,
  hours: {
    type: [subscriptionTime],
    validate: {
      validator: function (v) {
        return v.length > 0;
      },
      message: 'Provide at least 1 subscription time',
    },
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
