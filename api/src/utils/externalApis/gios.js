const superagent = require('superagent');

const giosUrl = 'http://api.gios.gov.pl/pjp-api/rest';

const giosRequest = async (endpoint) => {
  const res = await superagent.get(giosUrl + endpoint);
  return res.body;
};

exports.getStations = () => {
  const endpoint = '/station/findAll';
  return giosRequest(endpoint);
};

exports.getAirIndex = (stationId) => {
  const endpoint = `/aqindex/getIndex/${stationId}`;
  return giosRequest(endpoint);
};

exports.getStationSensors = (stationId) => {
  const endpoint = `/station/sensors/${stationId}`;
  return giosRequest(endpoint);
};

exports.getSensorData = (sensorId) => {
  const endpoint = `/data/getData/${sensorId}`;
  return giosRequest(endpoint);
};
