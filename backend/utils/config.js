require('dotenv').config();

const { PORT } = process.env;

// istanbul ignore next: This line is excluded from test coverage
const SELECT_MONGO_URI = () => {
  switch (process.env.NODE_ENV) {
    case 'test':
      return process.env.MONGODB_URI_UNIT_TEST;
    case 'development':
      return process.env.MONGODB_URI_TEST;
    default:
      return process.env.MONGODB_URI;
  }
};

// istanbul ignore next: This line is excluded from test coverage
const MONGODB_URI = SELECT_MONGO_URI();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const JWT_SECRET = process.env.SECRET;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const FRONTEND_ENDPOINT = process.env.FRONTEND_ENDPOINT;

module.exports = {
  PORT,
  MONGODB_URI,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  JWT_SECRET,
  GMAIL_APP_PASSWORD,
  FRONTEND_ENDPOINT,
};
