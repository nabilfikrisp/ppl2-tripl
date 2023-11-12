const mongoose = require('mongoose');
const supertest = require('supertest');
const User = require('../models/user');
const app = require('../app');
const { MONGODB_URI } = require('../utils/config');

const api = supertest(app);

beforeAll(() => {
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

describe('Authentication API', () => {
  test('register a user', async () => {
    await api
      .post('/api/auth/register')
      .send({
        email: 'unittest@gmail.com',
        name: 'unit',
        password: 'password123',
      })
      .expect(201);
  });

  test('login with the registered user', async () => {
    await api
      .post('/api/auth/login')
      .send({
        email: 'unittest@gmail.com',
        password: 'password123',
      })
      .expect(200);
  });

  test('handle invalid email password', async () => {
    await api
      .post('/api/auth/login')
      .send({
        email: 'unittes1@gmail.com',
        password: 'password1232',
      })
      .expect(400);
  });

  test('handle missing body key on register', async () => {
    await api
      .post('/api/auth/register')
      .send({
        email: 'unittest@gmail.com',
        name: 'unit',
      })
      .expect(400);
  });

  test('handle missing invalid email format', async () => {
    await api
      .post('/api/auth/register')
      .send({
        email: 'unittestgmail.com',
        name: 'unit',
        password: 'password123',
      })
      .expect(400);
  });

  test('should return 400 status if email already exists', async () => {
    await User.create({
      email: 'unittestexsist@gmail.com',
      name: 'existing user',
      password: 'existingpassword',
    });

    const response = await api.post('/api/auth/register').send({
      email: 'unittestexsist@gmail.com',
      name: 'unit',
      password: 'password123',
    });

    expect(response.status).toBe(400);
  });

  test('handle malformatted password length on register', async () => {
    const response = await api.post('/api/auth/register').send({
      email: 'unittestminpw@gmail.com',
      name: 'unitpw',
      password: 'pw',
    });

    expect(response.status).toBe(400);
  });
});

afterAll(async () => {
  await User.collection.drop();
  await mongoose.connection.close();
});
