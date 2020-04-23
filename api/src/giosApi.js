const http = require('http');

const gios_url = 'http://api.gios.gov.pl/pjp-api/rest';

exports.getStations = function (callback) {
  const endpoint = '/station/findAll';
  httpGet(endpoint, callback);
};

exports.getAirIndex = function (stationId, callback) {
  const endpoint = '/aqindex/getIndex/' + stationId;
  httpGet(endpoint, callback);
};

function httpGet(endpoint, callback) {
  const url = gios_url + endpoint;

  http
    .get(url, function (res) {
      const { statusCode } = res;
      const contentType = res.headers['content-type'];

      let error;
      if (statusCode !== 200) {
        error = new Error(
          'Request Failed.\n' + 'Status Code: ${statusCode} for ' + endpoint
        );
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error(
          'Invalid content-type.\n' +
            'Expected application/json but received ${contentType} for ' +
            endpoint
        );
      }
      if (error) {
        console.error(error.message);
        // Consume response data to free up memory
        res.resume();
        return;
      }

      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', (chunk) => {
        rawData += chunk;
      });
      res.on('end', () => {
        try {
          callback(JSON.parse(rawData));
        } catch (e) {
          console.error(e.message);
        }
      });
    })
    .on('error', (e) => {
      console.error('Got error: ${e.message} for ' + endpoint); // TODO: jakiś throw pewnie by się przydał
    });
}