const env = require('./env');

const mongoose = require('mongoose');

// MongoDB
mongoose
  .connect(env.DB + '/airDataDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Db connected successfully'))
  .catch((err) => console.log('Error connecting db'));

exports = mongoose.connection;
