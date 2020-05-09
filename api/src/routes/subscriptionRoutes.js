const router = require('express').Router();

const subscriptionController = require('../controllers/subscriptionController');

router
  .route('/')
  .post(subscriptionController.verifyBodyNew, subscriptionController.new);

router
  .route('/:subscriptionId') // TODO: zamiast id token jwt
  .get(subscriptionController.get)
  .patch(subscriptionController.update)
  .put(subscriptionController.update)
  .delete(subscriptionController.delete);

module.exports = router;
