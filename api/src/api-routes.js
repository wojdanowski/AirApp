const router = require('express').Router();

router.get('/', function (req, res) {
  res.json({
    message: 'API works',
  });
});

const subscriptionController = require('./controllers/subscriptionController');
const stationController = require('./controllers/stationController');

router.route('/subscriptions').post(subscriptionController.new);

router
  .route('/subscriptions/:subscription_id') // TODO: zamiast id token jwt
  .get(subscriptionController.get)
  .patch(subscriptionController.update)
  .put(subscriptionController.update)
  .delete(subscriptionController.delete);

router.route('/stations').get(stationController.all);
router.route('/stations/:station_id').get(stationController.airIndex);

module.exports = router;
