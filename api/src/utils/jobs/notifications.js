const Subscription = require('../../models/subscriptionModel');
const sendEmail = require('../email');
const { findNearestStation } = require('../../controllers/stationController');

const schedule = require('node-schedule');

const sendNotification = async (subscription) => {
  // get air data for nearest station
  let message = '';

  try {
    let station = await findNearestStation(
      subscription.location.coordinates[0],
      subscription.location.coordinates[1]
    );

    message = JSON.stringify(station);
  } catch (err) {
    console.log(`Error while LOOKING for air data for ${subscription.email}`);
    console.log(err);
    return;
  }
  // send mail
  try {
    await sendEmail({
      email: subscription.email,
      subject: 'Twoje powietrze - Air App',
      message: message,
    });
  } catch (err) {
    console.log(`Error while SENDING air data for ${subscription.email}`);
    console.log(err);
    return;
  }
};

const sendHourNotifications = async (hour) => {
  try {
    const subscriptions = await Subscription.find({ hours: hour });
    console.log(`Sending ${subscriptions.length} notifications (${hour})`);
    subscriptions.map(async (subscription) => {
      await sendNotification(subscription);
    });
  } catch (err) {
    console.log(`Error while looking for hour ${hour} subscriptions`);
    console.log(err);
    return;
  }
};

exports.start = async () => {
  console.log('Notifications job started');
  const job = schedule.scheduleJob('0 * * * *', (fireDate) => {
    console.log(`Notifications run at ${fireDate}`);
    sendHourNotifications(fireDate.getHours());
  });
};
