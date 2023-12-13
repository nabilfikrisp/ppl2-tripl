const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const supertest = require('supertest');
const app = require('../app');
const PasswordReset = require('../models/passwordReset');
const User = require('../models/user');
const { MONGODB_URI } = require('../utils/config');

const api = supertest(app);

beforeAll(async () => {
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await User.create({
    email: 'reset@gmail.com',
    name: 'reset',
    password: 'resetpassword',
  });
});

describe('Forgot Password Feature', () => {
  test('should send a password reset email and return a success message', async () => {
    const requestBody = {
      email: 'reset@gmail.com',
    };

    const response = await api
      .post('/api/auth/forgot-password')
      .send(requestBody)
      .expect(200);

    expect(response.body.message).toBe('Check your email');
  });

  test('should reset the password for a user with a valid token', async () => {
    const { token } = await PasswordReset.findOne({ email: 'reset@gmail.com' });

    const response = await api
      .post('/api/auth/reset')
      .send({ token, password: 'newPassword' })
      .expect(200);

    expect(response.body.message).toBe('Your password successfully updated');
    const updatedUser = await User.findOne({ email: 'reset@gmail.com' });
    expect(updatedUser).toBeTruthy();
    expect(await bcrypt.compare('newPassword', updatedUser.passwordHash)).toBe(
      true
    );
  });
});

afterAll(async () => {
  await User.collection.drop();
  await PasswordReset.collection.drop();
  await mongoose.connection.close();
});
