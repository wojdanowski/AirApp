const router = require('express').Router();

const subController = require('../controllers/subscriptionController');

router.route('/').post(subController.verifyBodyNew, subController.new);

router
  .route('/activate/:token')
  .get(subController.hashToken, subController.activate);
router
  .route('/:subscriptionId') // TODO: zamiast id token jwt
  .get(subController.get)
  .patch(subController.update)
  .put(subController.update)
  .delete(subController.delete);

module.exports = router;
