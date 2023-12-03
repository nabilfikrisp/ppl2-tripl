const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');
const { MONGODB_URI } = require('../utils/config');

const api = supertest(app);

beforeAll(async () => {
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const locations = await api.get('/api/locations?page=1&pageSize=2');
  const locationsId = locations.body.map((location) => location.id);

  const seedUsers = [
    {
      email: 'userexample@gmail.com',
      name: 'example user',
      plans: [...locationsId],
      password: 'examplepassword',
    },
    {
      email: 'userexample1@gmail.com',
      name: 'example user1',
      plans: [...locationsId],
      password: 'examplepassword1',
    },
  ];

  await User.insertMany(seedUsers);
});

describe('User API', () => {
  test('GET /api/users should return all users without plans', async () => {
    const response = await api.get('/api/users').expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /api/users should return all users with plans if includePlans query is set', async () => {
    const response = await api.get('/api/users?includePlans=true').expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0].plans).toBeDefined(); // Assuming plans are a populated field
  });

  test('GET /api/users/:id should return a specific user', async () => {
    const newUser = await User.create({
      email: 'userexample2@gmail.com',
      name: 'example user2',
      password: 'examplepassword2',
    });

    const response = await api.get(`/api/users/${newUser._id}`).expect(200);

    expect(response.body.name).toBe(newUser.name);
    expect(response.body.email).toBe(newUser.email);
  });

  test('GET /api/users/:id should return 404 if user is not found with malformatted id', async () => {
    const nonExistentUserId = '012312312';

    await api.get(`/api/users/${nonExistentUserId}`).expect(404);
  });

  test('GET /api/users/:id should return 404 if user is not found', async () => {
    const nonExistentUserId = '6515523b450954f327877039';

    await api.get(`/api/users/${nonExistentUserId}`).expect(404);
  });
});

afterAll(async () => {
  await User.collection.drop();
  await mongoose.connection.close();
});
