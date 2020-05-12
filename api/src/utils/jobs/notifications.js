const moment = require('moment-timezone');
const schedule = require('node-schedule');
const env = require('../../setup/env');
const { findNearestStation } = require('../../services/stationService');
const { getActiveForHour } = require('../../services/subscriptionService');
const sendEmail = require('../email');

const sendNotification = async (subscription) => {
  let message = '';
  // get air data for nearest station
  try {
    const station = await findNearestStation({
      lon: subscription.location.coordinates[0],
      lat: subscription.location.coordinates[1],
    });

    message = JSON.stringify(station);
    // FIXME: message musi zawierać link do delete oraz link do update (generować nowy token)
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
  }
};

const sendActualNotifications = async (day, hour, minute) => {
  try {
    const subscriptions = await getActiveForHour(day, hour, minute);
    console.log(
      `Sending ${subscriptions.length} notifications (Day: ${day}, Hour: ${hour}, ${minute})`
    );
    subscriptions.map(async (subscription) => {
      await sendNotification(subscription);
    });
  } catch (err) {
    console.log(`Error while looking for hour ${hour} subscriptions`);
    console.log(err);
  }
};

exports.run = async () => {
  console.log('Notifications job started');
  //FIXME: dostosować do nowego formatu daty
  const job = schedule.scheduleJob('* * * * *', (fireDate) => {
    const localTime = moment(fireDate).tz(env.TIMEZONE);
    console.log(`Notifications run at ${localTime}`);
    sendActualNotifications(
      localTime.day(),
      localTime.hour(),
      localTime.minute()
    );
  });
};
