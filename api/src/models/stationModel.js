const { locationPoint, mIndex } = require('./nestedSchemas');

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
  location: locationPoint,
  name: String,
  stIndex: {
    indexLevel: {
      id: Number,
      indexLevelName: String,
    },
    calcDate: Date,
    sourceDataDate: Date,
    indexStatus: Boolean,
    indexParam: String,
  },
  mIndexes: [mIndex],
});

stationSchema.index({ location: '2dsphere' });

const Station = (module.exports = mongoose.model('station', stationSchema));
module.exports.get = (callback, limit) => {
  Station.find(callback).limit(limit);
};
