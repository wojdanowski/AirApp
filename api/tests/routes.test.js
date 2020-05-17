const request = require('supertest');
const db = require('../src/setup/db');
const app = require('../src/setup/app');

describe('Server root endpoint', () => {
  it('Should return status OK', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
  });
});

describe('Stations endpoints', () => {
  it('Should return all stations', async () => {
    const res = await request(app).get('/api/stations');
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body).toHaveProperty('data');

    expect(res.body.data.stations.length).toEqual(3);

    const station = res.body.data.stations[0];

    expect(station).toHaveProperty('stIndex');
    expect(station).toHaveProperty('_id');
    expect(station).toHaveProperty('location');
    expect(station).toHaveProperty('name');
    expect(station).toHaveProperty('mIndexes');
    expect(station).toHaveProperty('source');
  });

  it('Should return distinct indexes', async () => {
    const res = await request(app).get('/api/indexes');
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body).toHaveProperty('data');

    const expected = ['C6H6', 'CO', 'NO2', 'O3', 'PM10', 'PM25', 'SO2'].sort();
    let { indexes } = res.body.data;
    indexes = indexes.sort();

    expect(indexes).toEqual(expected);
  });

  it('Should return nearest station Wroclaw - Bartnicza', async () => {
    const lat = 51.12;
    const lon = 17.15;
    const res = await request(app).get(`/api/nearest?lat=${lat}&lon=${lon}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body).toHaveProperty('data');

    expect(res.body.data.station.name).toEqual('Wrocław - Bartnicza');
  });

  it('Should return nearest station Wroclaw - Korzeniowskiego', async () => {
    const lat = 51.11;
    const lon = 17.0;
    const res = await request(app).get(`/api/nearest?lat=${lat}&lon=${lon}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body).toHaveProperty('data');

    expect(res.body.data.station.name).toEqual('Wrocław - Korzeniowskiego');
  });

  it('Should return nearest station Legnica - Rzeczypospolitej', async () => {
    const lat = 51.2;
    const lon = 16.17;
    const res = await request(app).get(`/api/nearest?lat=${lat}&lon=${lon}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body).toHaveProperty('data');

    expect(res.body.data.station.name).toEqual('Legnica - Rzeczypospolitej');
  });
});

afterAll(async () => {
  // Closes the Mongoose connection
  await db.close();
});
