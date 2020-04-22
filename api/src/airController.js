
Gios = require('./giosApi');

exports.stations = function (req, res) {
    Gios.getStations(function (data) {
        res.send(data);
    });
}

exports.airIndex = function (req, res) {
    Gios.getAirIndex(req.params.station_id, function (data) {
        res.send(data);
    })
}