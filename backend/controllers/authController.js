const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');
const passGenerator = require('generate-password');
const axios = require('axios');
const nodemailer = require('nodemailer');
const User = require('../models/user');
const {
  JWT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GMAIL_APP_PASSWORD,
  FRONTEND_ENDPOINT,
} = require('../utils/config');
const PasswordReset = require('../models/passwordReset');

const EMAIL_TRANSPORTER = 'mnabilfikrisp@gmail.com';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_TRANSPORTER,
    pass: GMAIL_APP_PASSWORD,
  },
});

const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'postmessage'
);

const login = async (request, response) => {
  const { email, password } = request.body;

  const user = await User.findOne({ email });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(400).json({
      error: 'invalid email or password',
    });
  }

  const userForToken = {
    email: user.email,
    id: user._id,
  };

  const token = jwt.sign(userForToken, JWT_SECRET);

  response.status(200).send({ token, email: user.email, name: user.name });
};

const register = async (request, response) => {
  const { name, email, password } = request.body;

  if (!name || !password || !email) {
    return response
      .status(400)
      .json('email, name, and password cannot be null');
  }

  const emailRegex = /^[A-Za-z0-9+_.-]+@(.+)$/;

  if (!emailRegex.test(email)) {
    return response.status(400).json('invalid email format');
  }

  const duplicateEmail = await User.find({ email });
  if (duplicateEmail.length) {
    return response.status(400).json('email already registered');
  }

  if (password.length < 6) {
    return response
      .status(400)
      .json('password must be at least 6 characters long');
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    email,
    name,
    passwordHash,
  });

  try {
    const savedUser = await user.save();
    return response.status(201).json(savedUser);
  } catch (error) {
    // istanbul ignore next: This line is excluded from test coverage
    return response.status(400).json({ error: `${error}` });
  }
};

const loginByGoogle = async (request, response) => {
  try {
    const { code } = request.body;

    const tokens = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: 'postmessage',
      grant_type: 'authorization_code',
    });

    const ticket = await oAuth2Client.verifyIdToken({
      idToken: tokens.data.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const emailGoogle = payload.email;
    const nameGoogle = payload.given_name;
    const user = await User.findOne({ email: emailGoogle });
    if (user) {
      const userForToken = {
        email: user.email,
        id: user._id,
      };

      const jwtToken = jwt.sign(userForToken, JWT_SECRET);
      return response
        .status(200)
        .send({ token: jwtToken, email: user.email, name: user.name });
    } else {
      const password = passGenerator.generate({
        length: 8,
        number: true,
      });
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);
      const registerUser = new User({
        email: emailGoogle,
        name: nameGoogle,
        passwordHash,
      });
      const storedUser = await registerUser.save();

      const userForToken = {
        email: storedUser.email,
        id: storedUser.id,
      };

      const jwtToken = jwt.sign(userForToken, JWT_SECRET);
      return response.status(200).send({
        token: jwtToken,
        email: storedUser.email,
        name: storedUser.name,
      });
    }
  } catch (error) {
    return response.status(400).json({ error: `${error}` });
  }
};

// istanbul ignore next: This line is excluded from test coverage
const passwordReset = async (request, response) => {
  const { email } = request.body;
  const token = Math.random().toString(20).substring(2, 12);

  const passwordResetQuery = new PasswordReset({
    email,
    token,
  });

  await passwordResetQuery.save();

  const url = `${FRONTEND_ENDPOINT}/reset/${token}`;

  await transporter.sendMail({
    from: EMAIL_TRANSPORTER,
    to: email,
    subject: 'TRIPL Reset Password',
    html: `Click <a href="${url}">here</a> to reset your password`,
  });

  return response.status(200).send({
    message: 'Check your email',
  });
};

// istanbul ignore next: This line is excluded from test coverage
const handleResetPassword = async (request, response) => {
  const { token, password } = request.body;

  const { email } = await PasswordReset.findOne({ token });
  const user = await User.findOne({ email });

  if (!user) {
    return response.status(404).send({ message: 'User not registered' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  user.passwordHash = passwordHash;
  user.save();

  return response.send({ message: 'Your password successfully updated' });
};

module.exports = {
  login,
  register,
  loginByGoogle,
  passwordReset,
  handleResetPassword,
};
