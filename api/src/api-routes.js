const router = require('express').Router();

router.get('/', function (req, res) {
  res.json({
    message: 'API works',
  });
});

const subscriptionController = require('./controllers/subscriptionController');
const airController = require('./controllers/airController');

router.route('/subscriptions').post(subscriptionController.new);

router
  .route('/subscriptions/:subscription_id') // TODO: zamiast id token jwt
  .get(subscriptionController.view)
  .patch(subscriptionController.update)
  .put(subscriptionController.update)
  .delete(subscriptionController.delete);

router.route('/gios/stations').get(airController.stations);
router.route('/gios/stations/:station_id').get(airController.airIndex);

module.exports = router;
