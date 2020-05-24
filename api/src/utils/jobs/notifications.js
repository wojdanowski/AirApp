const moment = require('moment-timezone');
const schedule = require('node-schedule');
const env = require('../../setup/env');
const { findNearestStation } = require('../../services/stationService');
const { getActiveForHour } = require('../../services/subscriptionService');
const sendEmail = require('../email');
const HTMLGenerator = require('../HTMLGenerator');

const setNotificationParams = (subscription, station) => {
  const recommendations = [
    'Ruszaj na dwór! Szkoda spędzać taki dzień w domu.',
    'Zostań na dworze! Pyły są pod kontrolą.',
    'Jakiś plener dzisiaj? Chyba szaro to widzę… ',
    'Jeszcze będzie dobrze, ale teraz ogranicz swoją aktywność na powietrzu.',
    'Lepiej zamknij wszystkie okna, smog czai się za rogiem.',
    'Tylko spokój i maski przeciwpyłowe nas ocalą',
  ];

  const params = {};
  let mainIndex = station.mIndexes.find((mIndex) => {
    return mIndex.param === 'PM10';
  });
  if (!mainIndex) mainIndex = station.mIndexes[0];
  const token = subscription.createManageToken();

  params.deleteLink = `${env.DELETE_SUB_LINK}${token}`;
  params.location = station.name;
  params.mainLvl = mainIndex.indexLevel.indexLevelName;
  params.catImgId = mainIndex.indexLevel.id;
  params.recommendation = recommendations[mainIndex.indexLevel.id];

  return params;
};

const sendNotification = async (subscription) => {
  // get air data for nearest station
  let station = {};
  try {
    station = await findNearestStation({
      lon: subscription.location.coordinates[0],
      lat: subscription.location.coordinates[1],
    });
  } catch (err) {
    console.log(`Error while LOOKING for air data for ${subscription.email}`);
    console.log(err);
    return;
  }
  // send mail
  const params = setNotificationParams(subscription, station);
  const { html, attachments } = await HTMLGenerator({
    template: 'notification',
    params,
    images: [
      'logo.png',
      'facebook.png',
      'gplus.png',
      'twitter.png',
      'geo_icon.png',
      `cat_${params.catImgId}.png`,
      'test.png',
    ],
  });
  try {
    await sendEmail({
      email: subscription.email,
      subject: 'Twoje powietrze - Air App',
      html,
      attachments,
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
  const job = schedule.scheduleJob('* * * * *', (fireDate) => {
    const localTime = moment(fireDate).tz(env.TIMEZONE);
    // console.log(`Notifications run at ${localTime}`);
    sendActualNotifications(
      localTime.day(),
      localTime.hour(),
      localTime.minute()
    );
  });
};
