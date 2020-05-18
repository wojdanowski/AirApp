const db = require('./setup/db');
const env = require('./setup/env');
const notifications = require('./utils/jobs/notifications');
const stationLocationJob = require('./utils/jobs/stationLocation');
const airIndexJob = require('./utils/jobs/stationAirIndex');
const sensorDataJob = require('./utils/jobs/sensorData');

notifications.run();
//TODO: te joby mają taką samą funkcję start(). Warto stworzyć jakiegoś jobSchedulera
stationLocationJob.start(env.STATIONSCHEDULE, 15);
airIndexJob.start(env.AIRDATASCHEDULE, 60);
sensorDataJob.start(env.AIRDATASCHEDULE, 120);
