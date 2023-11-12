const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const { MONGODB_URI } = require('../utils/config');

const api = supertest(app);

beforeAll(() => {
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

describe('Locations API', () => {
  test('returns locations as JSON', async () => {
    await api
      .get('/api/locations')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('fetches locations with search parameters', async () => {
    await api
      .get('/api/locations?search=citarum')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('fetches locations with type parameters', async () => {
    const response = await api
      .get('/api/locations?type=restoran')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body[0].type).toBe('restoran');
  });

  test('fetches locations with pageSize parameter of 10', async () => {
    const response = await api.get('/api/locations?pageSize=10');
    expect(response.body).toHaveLength(10);
  });

  test('fetches locations with page and pageSize parameters', async () => {
    const response = await api.get('/api/locations?page=3&pageSize=5');
    expect(response.body).toHaveLength(5);
  });

  test('fetches location details', async () => {
    const firstResponse = await api.get('/api/locations?page=1&pageSize=5');
    const firstData = firstResponse.body[0];

    const secondResponse = await api.get(`/api/locations/${firstData.id}`);
    expect(secondResponse.body).toBeDefined();
  });

  test('handles malformatted location detail id', async () => {
    await api.get(`/api/locations/6517f3c44e1722e36c8ff64asda`).expect(404);
  });
  test('handles non exsistent location detail id', async () => {
    await api.get(`/api/locations/6517f3c44e1722e36c8fffff`).expect(404);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
