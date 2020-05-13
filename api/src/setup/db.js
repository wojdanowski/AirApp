const mongoose = require('mongoose');
const env = require('./env');

// MongoDB
const DB = env.DB.replace('<PASSWORD>', env.DB_PASSWORD);
mongoose
  .connect(`${DB}/airDataDB`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Db connected successfully'));

module.exports = mongoose.connection;
