// modules
const env = require('./env');
const stationUpdater = require('./utils/stationUpdater');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//app
const app = express();
const apiRoutes = require('./api-routes');

// body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

// routes
app.get('/', (req, res) => {
	console.log(`Received ping!!!`);
	res.send('Server is up.');
});
app.use('/api', apiRoutes);

// run
app.listen(env.PORT, function () {
	console.log('Running on port ' + env.PORT);
});

// run update station
stationUpdater.scheduleUpdateStations();
