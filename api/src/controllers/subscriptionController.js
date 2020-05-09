const Subscription = require('../models/subscriptionModel');

exports.new = async (req, res) => {
  // TODO: walidacja danych
  try {
    const newSubscription = await Subscription.create({
      email: req.body.email,
      location: {
        type: 'Point',
        coordinates: [req.body.lon, req.body.lat],
      },
      hours: req.body.hours,
    });

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
    const subscription = await Subscription.findById(req.params.subscriptionId);

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
    const subscription = await Subscription.findByIdAndUpdate(
      req.params.subscriptionId,
      {
        location: {
          type: 'Point',
          coordinates: [req.body.lon, req.body.lat],
        },
        hours: req.body.hours,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!subscription) {
      res.status(404).json({
        status: 'fail',
        message: 'Subscription not found',
      });
    } else {
      res.status(200).json({
        status: 'success',
        data: {
          subscription,
        },
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.delete = async (req, res) => {
  // TODO: wyszukiwanie po tokenie jwt, a nie id

  try {
    const deleted = await Subscription.findByIdAndDelete(
      req.params.subscriptionId
    );
    if (!deleted) {
      res.status(404).json({
        status: 'fail',
        message: "Subscription doesn't exist",
      });
    } else {
      res.status(204).end();
    }
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
