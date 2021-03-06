const request = require('supertest');
const db = require('../src/setup/db');
const app = require('../src/setup/app');

afterAll(async () => {
  // Closes the Mongoose connection
  await db.close();
});

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
    const res = await request(app).get(
      `/api/nearestAirIndex?lat=${lat}&lon=${lon}`
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body).toHaveProperty('data');

    const { station } = res.body.data;

    expect(station.name).toEqual('Wrocław - Bartnicza');

    expect(station).toHaveProperty('stIndex');
    expect(station).toHaveProperty('_id');
    expect(station).toHaveProperty('location');
    expect(station).toHaveProperty('mIndexes');
    expect(station).toHaveProperty('source');

    expect(station).toHaveProperty('distance');
    expect(station.distance).toBeCloseTo(0.7678, 3);
  });

  it('Should return nearest station Wroclaw - Korzeniowskiego', async () => {
    const lat = 51.11;
    const lon = 17.0;
    const res = await request(app).get(
      `/api/nearestAirIndex?lat=${lat}&lon=${lon}`
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body).toHaveProperty('data');

    const { station } = res.body.data;

    expect(station.name).toEqual('Wrocław - Korzeniowskiego');

    expect(station).toHaveProperty('stIndex');
    expect(station).toHaveProperty('_id');
    expect(station).toHaveProperty('location');
    expect(station).toHaveProperty('mIndexes');
    expect(station).toHaveProperty('source');

    expect(station).toHaveProperty('distance');
    expect(station.distance).toBeCloseTo(2.9716, 3);
  });

  it('Should return nearest station Legnica - Rzeczypospolitej', async () => {
    const lat = 51.2;
    const lon = 16.17;
    const res = await request(app).get(
      `/api/nearestAirIndex?lat=${lat}&lon=${lon}`
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body).toHaveProperty('data');

    const { station } = res.body.data;

    expect(station.name).toEqual('Legnica - Rzeczypospolitej');

    expect(station).toHaveProperty('stIndex');
    expect(station).toHaveProperty('_id');
    expect(station).toHaveProperty('location');
    expect(station).toHaveProperty('mIndexes');
    expect(station).toHaveProperty('source');

    expect(station).toHaveProperty('distance');
    expect(station.distance).toBeCloseTo(0.888, 3);
  });

  it('Should return 422 for nearest station without lat/lon', async () => {
    const res = await request(app).get('/api/nearestAirIndex');
    expect(res.statusCode).toEqual(422);
    expect(res.body.status).toEqual('fail');
    expect(res.body).toHaveProperty('message');
  });
});

describe('Sensors endpoints', () => {
  it('Should return sensors for correct station', async () => {
    const stationId = '5eb3f488bc7e8f9cc8d7bb0b';
    const res = await request(app).get(`/api/stations/sensors/${stationId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body).toHaveProperty('data');

    const sensors = res.body.data;

    expect(sensors.length).toBeGreaterThan(0);

    expect(sensors[0]).toHaveProperty('key');
    expect(sensors[0]).toHaveProperty('_id');
    expect(sensors[0]).toHaveProperty('station');
    expect(sensors[0]).toHaveProperty('values');
    expect(sensors[0].values.length).toBeGreaterThan(0);
  });

  it('Should return 404 for non existing station', async () => {
    const stationId = '5eb443e8bbb79f259d22d6c2';
    const res = await request(app).get(`/api/stations/sensors/${stationId}`);

    expect(res.statusCode).toEqual(404);
    expect(res.body.status).toEqual('fail');
    expect(res.body).toHaveProperty('message');
  });

  it('Should return 400 for invalid station id', async () => {
    const stationId = 'xx';
    const res = await request(app).get(`/api/stations/sensors/${stationId}`);

    expect(res.statusCode).toEqual(400);
    expect(res.body.status).toEqual('fail');
    expect(res.body).toHaveProperty('message');
  });
});

describe('Distance endpoints', () => {
  it('Should return distance 0', async () => {
    const pointA = { lat: 17, lon: 51 };
    const pointB = { lat: 17, lon: 51 };

    const res = await request(app)
      .post('/api/distance')
      .send({ pointA: pointA, pointB: pointB });

    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.data.distance).toEqual(0);
  });

  it('Should return correct distance', async () => {
    const pointA = { lat: 53.32055555555556, lon: -1.7297222222222221 };
    const pointB = { lat: 53.31861111111111, lon: -1.6997222222222223 };

    const res = await request(app)
      .post('/api/distance')
      .send({ pointA: pointA, pointB: pointB });

    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.data.distance).toBeCloseTo(2.0043, 3);
  });

  it('Should return 422 for invalid points data (string)', async () => {
    const pointA = { lat: 'A', lon: 51 };
    const pointB = { lat: 17, lon: 51 };

    const res = await request(app)
      .post('/api/distance')
      .send({ pointA: pointA, pointB: pointB });

    expect(res.statusCode).toEqual(422);
    expect(res.body.status).toEqual('fail');
    expect(res.body).toHaveProperty('message');
  });

  it('Should return 422 for invalid points data (no point)', async () => {
    const pointA = { lat: 17, lon: 51 };

    const res = await request(app)
      .post('/api/distance')
      .send({ pointA: pointA });

    expect(res.statusCode).toEqual(422);
    expect(res.body.status).toEqual('fail');
    expect(res.body).toHaveProperty('message');
  });

  it('Should return 422 for invalid points data (empty point)', async () => {
    const pointA = { lat: 17, lon: 51 };
    const pointB = {};

    const res = await request(app)
      .post('/api/distance')
      .send({ pointA: pointA, pointB: pointB });

    expect(res.statusCode).toEqual(422);
    expect(res.body.status).toEqual('fail');
    expect(res.body).toHaveProperty('message');
  });
});
