const db = require('./setup/db');
const stationUpdater = require('./utils/jobs/stationUpdater');
const notifications = require('./utils/jobs/notifications');

// update station list
stationUpdater.start();
// notifications
notifications.start();
