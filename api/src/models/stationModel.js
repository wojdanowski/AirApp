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
    enum: {
      values: ['Gios'],
    },
  },
  //TODO: duplikat z subscriptionModel
  location: {
    // GeoJSON
    type: {
      type: String,
      default: 'Point', // FIXME: coś default nie działa w update
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number], // lon, lat
      required: true,
    },
  },
  name: String,
});

stationSchema.index({ location: '2dsphere' });

const Station = (module.exports = mongoose.model('station', stationSchema));
module.exports.get = (callback, limit) => {
  Station.find(callback).limit(limit);
};
