// istanbul ignore next: This line is excluded from test coverage
const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params);
  }
};

// istanbul ignore next: This line is excluded from test coverage
const error = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(...params);
  }
};

module.exports = {
  info,
  error,
};
