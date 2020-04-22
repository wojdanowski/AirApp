const router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        message: 'API works'
    });
});

const subscriptionController = require('./subscriptionController');

router.route('/subscriptions')
    .post(subscriptionController.new);

router.route('/subscriptions/:subscription_id')  // TODO: zamiast id token jwt
    .get(subscriptionController.view)
    .patch(subscriptionController.update)
    .put(subscriptionController.update)
    .delete(subscriptionController.delete);

module.exports = router;