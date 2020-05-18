const Subscription = require('../models/subscriptionModel');
const DbQueryFeatures = require('../utils/dbQueryFeatures');
const env = require('../setup/env');
const sendEmail = require('../utils/email');

exports.createNew = async (body) => {
  const newSubscription = await Subscription.create({
    email: body.email,
    location: {
      type: 'Point',
      coordinates: [body.lon, body.lat],
    },
    hours: body.hours,
  });

  const token = newSubscription.createManageToken();
  await newSubscription.save({ validateBeforeSave: false });

  const message = `Link: ${env.ACTIVATE_SUB_LINK}${token}`;

  try {
    await sendEmail({
      email: newSubscription.email,
      subject: 'Aktywuj subskrypcję - Air App',
      message: message,
    });
  } catch {
    await Subscription.findByIdAndDelete(newSubscription._id);
    return -1;
  }
  return newSubscription;
};
exports.activate = async (hashedToken) => {
  const subscription = await Subscription.findOneAndUpdate(
    { token: hashedToken },
    { active: true },
    { new: true }
  );
  return subscription;
};

exports.get = async (hashedToken, query) => {
  const features = new DbQueryFeatures(
    Subscription.findOne({ token: hashedToken }),
    query
  ).limitFields();
  const subscription = await features.query;
  return await features.query;
};

exports.update = async (hashedToken, body) => {
  const subscription = await Subscription.findOneAndUpdate(
    { token: hashedToken },
    {
      location: {
        type: 'Point',
        coordinates: [body.lon, body.lat],
      },
      hours: body.hours,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  return subscription;
};

exports.remove = async (hashedToken) => {
  const deleted = await Subscription.findOneAndDelete({ token: hashedToken });
  return deleted;
};

exports.getActiveForHour = async (day, hour, minute) => {
  return await Subscription.find({
    'hours.weekDay': day,
    'hours.hour': hour,
    'hours.minutes': minute,
    active: true,
  });
};
