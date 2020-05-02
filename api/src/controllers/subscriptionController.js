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
    //FIXME: na heroku jest czas gmt - najatwiej byłoby gdyby czas przychodził w gmt - musiałoby to być rozwiązane w frontendzie

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
    const deleted = await Subscription.findByIdAndDelete(
      req.params.subscription_id
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
