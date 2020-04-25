const Gios = require('../utils/giosApi');
const Station = require('../models/stationModel');

exports.all = async (req, res) => {
  try {
    const stations = await Station.find();

    res.status(200).json({
      status: 'success',
      data: { stations },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.airIndex = (req, res) => {
  // jeżeli będą stacje spoza GIOS, to musi być przerobione
  // dodatkowo, w gios nie ma danych stacji przy airIndex,
  // może warto najpierw sprawdzić w bazie co to za stacja,
  // a potem dopiero zrobić zapytanie
  Gios.getAirIndex(req.params.station_id, function (data) {
    res.send(data);
  });
};
