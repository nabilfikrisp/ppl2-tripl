const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

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

  const token = jwt.sign(userForToken, process.env.SECRET);

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

module.exports = { login, register };
