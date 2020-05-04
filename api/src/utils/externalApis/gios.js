const superagent = require('superagent');

const gios_url = 'http://api.gios.gov.pl/pjp-api/rest';

const giosRequest = async (endpoint) => {
  try {
    const res = await superagent.get(gios_url + endpoint);
    return res.body;
  } catch (err) {
    console.log(`Error when calling Gios ${endpoint}`);
    throw err;
  }
};

exports.getStations = async () => {
  const endpoint = '/station/findAll';
  return await giosRequest(endpoint);
};

exports.getAirIndex = async (stationId) => {
  const endpoint = '/aqindex/getIndex/' + stationId;
  return await giosRequest(endpoint);
};

exports.getMeasurementStations = async (stationId) => {
  const endpoint = '/station/sensors/' + stationId;
  return await giosRequest(endpoint);
};

exports.getMeasurementData = async (measurementId) => {
  const endpoint = '/rest/data/getData/' + measurementId;
  return await giosRequest(endpoint);
};
