const functions = require('firebase-functions');
const express = require('express');
const https = require('https');

const app = express();
const port = 3000;
const wakeUpIntervalMin = 28;

app.listen(port, function () {
	console.log(`Listening to Port ${port}`);
});

app.get('/', (req, res) => {
	res.send('Pinger is running');
});

const sendCall = () => {
	console.log('Sending wake up call');
	https
		.get('https://air-data-api.herokuapp.com', (resp) => {
			let data = '';

			// A chunk of data has been recieved.
			resp.on('data', (chunk) => {
				data += chunk;
			});

			// The whole response has been received. Print out the result.
			resp.on('end', () => {
				console.log(data);
				// console.log(JSON.parse(data).explanation);
			});
		})
		.on('error', (err) => {
			console.log('Error: ' + err.message);
		});
};

sendCall();
setInterval(() => {
	sendCall();
}, 1000 * 60 * wakeUpIntervalMin);

exports.app = functions.https.onRequest(app);
