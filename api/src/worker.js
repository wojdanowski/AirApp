const db = require('./setup/db');
const stationUpdater = require('./utils/jobs/stationUpdater');
const notifications = require('./utils/jobs/notifications');

// run update station
stationUpdater.start();
// run notifications
notifications.start();
