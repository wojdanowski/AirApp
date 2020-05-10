const mongoose = require('mongoose');
const { locationPoint, mIndex } = require('./nestedSchemas');

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
  // sensors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'sensor' }],
});

stationSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('station', stationSchema);
