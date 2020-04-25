Gios = require('../utils/giosApi');

// TODO: testowo. potem chyba niepotrzebne

exports.stations = (req, res) => {
  Gios.getStations(function (data) {
    res.send(data);
  });
};

exports.airIndex = (req, res) => {
  Gios.getAirIndex(req.params.station_id, function (data) {
    res.send(data);
  });
};
