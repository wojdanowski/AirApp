
Gios = require('./giosApi');

exports.stations = function (req, res) {
    Gios.getStations(function (data) {
        res.send(data);
    });
}