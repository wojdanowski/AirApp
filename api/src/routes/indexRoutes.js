const router = require('express').Router();

const stationController = require('../controllers/stationController');

router.route('/nearestAirIndex').get(stationController.nearestAirIndex); // ?lat=X&lon=Y
router.route('/indexes').get(stationController.indexList);

module.exports = router;
