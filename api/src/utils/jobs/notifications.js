const moment = require('moment-timezone');
const schedule = require('node-schedule');
const env = require('../../setup/env');
const { findNearestStation } = require('../../services/stationService');
const { stationSensors } = require('../../services/sensorService');
const { getActiveForHour } = require('../../services/subscriptionService');
const sendEmail = require('../email');
const HTMLGenerator = require('../HTMLGenerator');

const setNotificationParams = (subscription, station, sensors) => {
  const recommendations = [
    'Ruszaj na dwór! Szkoda spędzać taki dzień w domu.',
    'Zostań na dworze! Pyły są pod kontrolą.',
    'Jakiś plener dzisiaj? Chyba szaro to widzę… ',
    'Będzie dobrze, ale ogranicz aktywność na powietrzu.',
    'Lepiej zamknij wszystkie okna, smog czai się za rogiem.',
    'Tylko spokój i maski przeciwpyłowe nas ocalą',
  ];
  const colors = [
    '#6AEA5F',
    '#BFE95F',
    '#EFE95F',
    '#EA9C37',
    '#E94F4F',
    '#692108',
  ];

  const measurements = [
    { index: 'O3', fullName: 'Ozon', norma: 120 },
    { index: 'PM10', fullName: 'Pyły zawieszony <= 10 μm', norma: 50 },
    { index: 'PM25', fullName: 'Pyły zawieszony <= 2,5 μm', norma: 35 },
    { index: 'NO2', fullName: 'Dwutlenek azotu', norma: 100 },
    { index: 'SO2', fullName: 'Dwutlenek siarki', norma: 100 },
    { index: 'C6H6', fullName: 'Benzen', norma: 111 },
    { index: 'CO', fullName: 'Tlenek węgla', norma: 7000 },
  ];

  const allLevels = [];
  station.mIndexes.forEach((element) => {
    const data = measurements.find((mes) => {
      return mes.index === element.param;
    });

    const sensData = sensors.find((sensor) => {
      return sensor.key === element.param;
    });
    allLevels.push({
      name: element.param,
      indexLvl: element.indexLevel.indexLevelName,
      color: colors[element.indexLevel.id],
      norm: data.norma,
      fullName: data.fullName,
      lvl: sensData.values[0].value,
    });
  });

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
  params.indexes = allLevels;

  console.log(params.indexes);
  return params;
};

const sendNotification = async (subscription) => {
  // get air data for nearest station
  let station = {};
  let sensors = {};
  try {
    station = await findNearestStation({
      lon: subscription.location.coordinates[0],
      lat: subscription.location.coordinates[1],
    });
    sensors = await stationSensors(station._id, {});
  } catch (err) {
    console.log(`Error while LOOKING for air data for ${subscription.email}`);
    console.log(err);
    return;
  }

  // send mail
  const params = setNotificationParams(subscription, station, sensors);
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
