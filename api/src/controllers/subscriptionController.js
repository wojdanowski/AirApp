const Subscription = require('../models/subscriptionModel');

exports.new = async (req, res) => {
  // TODO: walidacja danych
  try {
    const newSubscription = await Subscription.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        subscription: newSubscription,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.get = async (req, res) => {
  // TODO: wyszukiwanie po tokenie jwt, a nie id
  try {
    const subscription = await Subscription.findById(
      req.params.subscription_id
    );

    res.status(200).json({
      status: 'success',
      data: { subscription },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.update = async (req, res) => {
  // TODO: walidacja danych
  // TODO: wyszukiwanie po tokenie jwt, a nie id

  try {
    const subscription = await Subscription.findByIdandUpdate(
      req.params.subscription_id,
      req.body,
      {
        runValidators: true,
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      //TODO: no 404 to średnio, mogą być neipoprawne dane
      status: 'fail',
      message: err,
    });
  }
};

exports.delete = async (req, res) => {
  // TODO: właściwe kody http
  // TODO: wyszukiwanie po tokenie jwt, a nie id

  try {
    await Subscription.findByIdandDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
