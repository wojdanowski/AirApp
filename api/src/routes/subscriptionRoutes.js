const router = require('express').Router();

const subController = require('../controllers/subscriptionController');

router.route('/').post(subController.new);

router
  .route('/activate/:token')
  .get(subController.hashToken, subController.activate);
router
  .route('/:token')
  .get(subController.hashToken, subController.get)
  .patch(subController.hashToken, subController.update)
  .delete(subController.hashToken, subController.delete);
module.exports = router;
