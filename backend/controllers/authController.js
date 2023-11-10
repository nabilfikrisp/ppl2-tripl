const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');
const passGenerator = require('generate-password');
const axios = require('axios');
const User = require('../models/user');
const {
  JWT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} = require('../utils/config');

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
    return response.status(401).json({
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

  if (password.length < 3) {
    return response
      .status(400)
      .json('password must be at least 3 characters long');
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

module.exports = { login, register, loginByGoogle };
