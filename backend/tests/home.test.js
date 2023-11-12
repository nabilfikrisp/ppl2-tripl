const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');

describe('GET / endpoint', () => {
  test('Api is working', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
  });

  test('Unknown Endpoint', async () => {
    const response = await request(app).get('/jfladsjf');

    expect(response.status).toBe(404);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
