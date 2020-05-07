const router = require('express').Router();

const subscriptionController = require('../controllers/subscriptionController');
const stationController = require('../controllers/stationController');

router.route('/subscriptions').post(subscriptionController.new);

router
  .route('/subscriptions/:subscription_id') // TODO: zamiast id token jwt
  .get(subscriptionController.get)
  .patch(subscriptionController.update)
  .put(subscriptionController.update)
  .delete(subscriptionController.delete);

router.route('/stations').get(stationController.all);
router.route('/nearestAirIndex').get(stationController.nearestAirIndex); // ?lat=X&lon=Y
router.route('/indexes').get(stationController.indexList);

module.exports = router;
