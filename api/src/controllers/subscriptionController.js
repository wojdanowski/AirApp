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
    const subscription = await Subscription.findByIdAndUpdate(
      req.params.subscription_id,
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

    res.status(200).json({
      status: 'success',
      data: {
        subscription,
      },
    });
  } catch (err) {
    res.status(404).json({
      //TODO: no 404 to średnio, mogą być niepoprawne dane
      status: 'fail',
      message: err,
    });
  }
};

exports.delete = async (req, res) => {
  // TODO: właściwe kody http
  // TODO: wyszukiwanie po tokenie jwt, a nie id

  try {
    await Subscription.findByIdAndDelete(req.params.subscription_id);

    // FIXME: kod 204 = no content, dlatego json nie ma sensu
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    // FIXME: nawet jak nic nie znajdzie, to nie rzuci rejecta. Niby ok, miało nie być i nie ma, ale powinien być ten 404
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
