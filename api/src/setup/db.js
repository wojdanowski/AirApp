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
  .then((con) => {
    console.log(
      `Db connected successfully. Host: ${con.connections[0].host} Name: ${con.connections[0].name}`
    );
  });

module.exports = mongoose.connection;
