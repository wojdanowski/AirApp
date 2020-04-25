const mongoose = require('mongoose');

const stationSchema = mongoose.Schema({
  station_id: {
    type: Number,
    required: true,
    unique: true,
  },
  source: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lon: {
    type: Number,
    required: true,
  },
  name: String,
});

const Station = (module.exports = mongoose.model('station', stationSchema));
module.exports.get = (callback, limit) => {
  Station.find(callback).limit(limit);
};
