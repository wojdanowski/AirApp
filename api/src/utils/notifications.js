const Subscription = require('../models/subscriptionModel');
const Station = require('../models/stationModel');
const Gios = require('./externalApis/gios');
const sendEmail = require('./email');
const schedule = require('node-schedule');

const sendNotification = async (subscription) => {
  // get air data for nearest station
  // TODO: duplikat z stationController
  let message = '';

  try {
    const stationList = await Station.find({
      location: {
        $nearSphere: {
          $geometry: subscription.location,
        },
      },
    }).limit(1);
    let station = stationList[0];

    const airData = await Gios.getAirIndex(station.station_id);
    // FIXME: jakaś normalna treść wiadomości
    message = JSON.stringify(airData);
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

exports.scheduleNotifications = async () => {
  const job = schedule.scheduleJob('0 * * * *', (fireDate) => {
    console.log(`Notifications run at ${fireDate}`);
    sendHourNotifications(fireDate.getHours());
  });
};
