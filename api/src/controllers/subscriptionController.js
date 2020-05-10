const Subscription = require('../models/subscriptionModel');
const DbQueryFeatures = require('../utils/dbQueryFeatures');

exports.verifyBodyNew = (req, res, next) => {
  // TODO: zaznaczyć, czego brakuje
  // TODO: walidacja typu danych
  if (!req.body.email || !req.body.lon || !req.body.lat || !req.body.hours) {
    return res
      .status(422)
      .json({ status: 'fail', message: 'Missing required parameters' });
  }
  next();
};

exports.new = async (req, res) => {
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
    const features = new DbQueryFeatures(
      Subscription.findById(req.params.subscriptionId),
      req.query
    ).limitFields();
    const subscription = await features.query;

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
