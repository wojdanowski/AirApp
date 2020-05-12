const mongoose = require('mongoose');
const env = require('./env');

// MongoDB
mongoose
  .connect(`${env.DB}/airDataDB`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Db connected successfully'));

module.exports = mongoose.connection;
