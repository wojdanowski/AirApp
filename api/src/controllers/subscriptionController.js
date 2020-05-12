const crypto = require('crypto');
const {
  activate,
  createNew,
  remove,
  get,
  update,
} = require('../services/subscriptionService');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.hashToken = (req, res, next) => {
  req.params.hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  next();
};

exports.new = catchAsync(async (req, res, next) => {
  const newSubscription = await createNew(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      subscription: newSubscription,
    },
  });
});

exports.activate = catchAsync(async (req, res, next) => {
  const subscription = await activate(req.params.hashedToken);

  // TODO: subskrypcja po aktywowaniu nie powinna dać się znowu aktywować
  // Niby nic nie psuje, ale dla porządku warto obsłużyć taki przypadek
  if (!subscription) {
    return next(new AppError('Subscription not found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      subscription,
    },
  });
});

exports.get = catchAsync(async (req, res, next) => {
  const subscription = await get(req.params.hashedToken, req.query);

  if (!subscription) {
    return next(new AppError('Subscription not found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      subscription,
    },
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const subscription = await update(req.params.hashedToken, req.body);

  if (!subscription) {
    return next(new AppError('Subscription not found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      subscription,
    },
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const deleted = await remove(req.params.hashedToken);

  if (!deleted) {
    return next(new AppError('Subscription not found', 404));
  }
  res.status(204).end();
});
