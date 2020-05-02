exports.locationPoint = {
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
};
