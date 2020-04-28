const superagent = require('superagent');

const gios_url = 'http://api.gios.gov.pl/pjp-api/rest';

exports.getStations = async () => {
  const endpoint = '/station/findAll';
  try {
    const res = await superagent.get(gios_url + endpoint);
    return res.body;
  } catch (err) {
    console.log(`Error when calling Gios ${endpoint}`);
    throw err;
  }
};

exports.getAirIndex = async (stationId) => {
  const endpoint = '/aqindex/getIndex/' + stationId;
  try {
    const res = await superagent.get(gios_url + endpoint);
    return res.body;
  } catch (err) {
    console.log(`Error when calling Gios ${endpoint}`);
    throw err;
  }
};
