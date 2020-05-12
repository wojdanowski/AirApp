const router = require('express').Router();

const stationController = require('../controllers/stationController');
const sensorController = require('../controllers/sensorController');

router.route('/').get(stationController.all);
router.route('/sensors/:stationId').get(sensorController.stationSensorsData);

module.exports = router;
