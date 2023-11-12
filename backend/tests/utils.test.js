const loggingModule = require('../utils/logger');

describe('Logging Functions', () => {
  let originalEnv;

  beforeAll(() => {
    originalEnv = process.env.NODE_ENV;
  });

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
  });

  test('info should log when NODE_ENV is not test', () => {
    const consoleLog = jest.spyOn(console, 'log');

    process.env.NODE_ENV = 'development';
    loggingModule.info('Test log for info');

    expect(consoleLog).toHaveBeenCalledWith('Test log for info');
    consoleLog.mockRestore();
  });

  test('info should not log when NODE_ENV is test', () => {
    const consoleLog = jest.spyOn(console, 'log');

    process.env.NODE_ENV = 'test';
    loggingModule.info('Test log for info');

    expect(consoleLog).not.toHaveBeenCalled();
    consoleLog.mockRestore();
  });

  test('error should log when NODE_ENV is not test', () => {
    const consoleError = jest.spyOn(console, 'error');

    process.env.NODE_ENV = 'development';
    loggingModule.error('Test log for error');

    expect(consoleError).toHaveBeenCalledWith('Test log for error');
    consoleError.mockRestore();
  });

  test('error should not log when NODE_ENV is test', () => {
    const consoleError = jest.spyOn(console, 'error');

    process.env.NODE_ENV = 'test';
    loggingModule.error('Test log for error');

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
  });
});
