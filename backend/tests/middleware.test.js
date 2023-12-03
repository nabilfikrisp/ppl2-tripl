const jwt = require('jsonwebtoken');
const {
  errorHandler,
  tokenExtractor,
  userExtractor,
} = require('../utils/middleware');

jest.mock('jsonwebtoken');

const User = require('../models/user');

jest.mock('../models/user');

describe('Middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('errorHandler handles CastError', () => {
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    const error = { name: 'CastError', message: 'malformatted id' };

    errorHandler(error, req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ error: 'malformatted id' });
  });

  test('errorHandler handles ValidationError', () => {
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const error = {
      name: 'ValidationError',
      message: 'validation error message',
    };

    errorHandler(error, req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'validation error message',
    });
  });

  test('errorHandler handles JsonWebTokenError', () => {
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const error = { name: 'JsonWebTokenError', message: 'invalid token' };

    errorHandler(error, req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'invalid token' });
  });

  test('tokenExtractor extracts token from authorization header', () => {
    const req = { get: jest.fn().mockReturnValue('Bearer test-token') };
    const res = {};
    const next = jest.fn();

    tokenExtractor(req, res, next);

    expect(req.token).toBe('test-token');
    expect(next).toHaveBeenCalled();
  });

  test('tokenExtractor sets null for missing token', () => {
    const req = { get: jest.fn().mockReturnValue(undefined) };
    const res = {};
    const next = jest.fn();

    tokenExtractor(req, res, next);

    expect(req.token).toBeNull();
    expect(next).toHaveBeenCalled();
  });

  test('userExtractor verifies and sets user data', async () => {
    const req = { token: 'valid-token' };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    const decodedToken = { id: 'user-id' };
    const user = { _id: 'user-id' };

    jwt.verify.mockReturnValue(decodedToken);
    User.findById.mockResolvedValue(user);

    await userExtractor(req, res, next);

    expect(req.user).toEqual(user);
    expect(next).toHaveBeenCalled();
  });

  test('userExtractor handles token invalid error', () => {
    const req = { token: 'invalid-token' };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    jwt.verify.mockImplementation(() => {
      throw new Error('token is invalid');
    });

    userExtractor(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  test('userExtractor handles non-existent user error', async () => {
    const req = { token: 'valid-token' };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    const decodedToken = { id: 'user-id' };

    jwt.verify.mockReturnValue(decodedToken);
    User.findById.mockResolvedValue(null);

    await userExtractor(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'non existent user' });
  });
});
