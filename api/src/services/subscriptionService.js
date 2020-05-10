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

  const message = `Link: ${env.ACTIVATE_SUB_LINK}/${token}`;

  try {
    await sendEmail({
      email: newSubscription.email,
      subject: 'Aktywuj subskrypcję - Air App',
      message: message,
    });
  } catch (err) {
    console.log(
      `Error while sending verification link for ${newSubscription.email}`
    );
    console.log(err);
  }

  return newSubscription;
};
