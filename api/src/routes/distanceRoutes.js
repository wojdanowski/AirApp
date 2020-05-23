const router = require('express').Router();

const distanceController = require('../controllers/distanceController');

router.route('/distance').post(distanceController.calcDistance);

module.exports = router;
