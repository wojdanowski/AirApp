
Subscription = require('./subscriptionModel');

exports.new = function (req, res) {
    let subscription = new Subscription();
    subscription.email = req.body.email;
    subscription.lat = req.body.lat;
    subscription.lon = req.body.lon;
    subscription.hours = req.body.lon;

    // TODO: walidacja danych
    // TODO: właściwe kody http

    subscription.save(function (err) {
        if (err) {
            res.json(err);
        }
        res.json({
            message: 'New contact created!',
            data: subscription
        });
    });
};

exports.view = function (req, res) {
    // TODO: właściwe kody http
    // TODO: wyszukiwanie po tokenie jwt, a nie id
    Subscription.findById(req.params.subscription_id, function (err, subscription) {
        if (err)
            res.send(err);
        res.json({
            message: 'Subscription details loading..',
            data: subscription
        });
    });
};

exports.update = function (req, res) {
    // TODO: walidacja danych
    // TODO: właściwe kody http
    // TODO: update wszyskiego i wymagać wszystkich danych, czy update tylko tego co jest?
    // TODO: wyszukiwanie po tokenie jwt, a nie id

    Subscription.findById(req.params.subscription_id, function (err, subscription) {
        if (err)
            res.send(err);
        subscription.lat = req.body.lat;
        subscription.lon = req.body.lon;

        Subscription.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Subscription info updated',
                data: subscription
            });
        });
    });
};

exports.delete = function (req, res) {
    // TODO: właściwe kody http
    // TODO: wyszukiwanie po tokenie jwt, a nie id
    Subscription.remove({
        _id: req.params.subscription_id
    }, function (err, subscription) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Subscription deleted'
        });
    });
};