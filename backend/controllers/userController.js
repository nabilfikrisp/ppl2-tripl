const bcrypt = require('bcryptjs');
const User = require('../models/user');

const getAll = async (request, response) => {
  const users = await User.find({});
  if (users.length === 0) {
    return response.json('there are no users yet');
  }
  return response.json(users);
};

const userSeeders = async (request, response) => {
  const initialUsers = [
    {
      email: 'user@gmail.com',
      name: 'John Brown',
      passwordHash: await bcrypt.hash('password123', 10),
    },
    {
      email: 'admin@gmail.com',
      name: 'admin',
      passwordHash: await bcrypt.hash('password123', 10),
    },
  ];

  try {
    await User.insertMany(initialUsers);

    return response.json('succesfully seeding user table');
  } catch (error) {
    return response.status(400).json(`error: ${error}`);
  }
};

module.exports = { getAll, userSeeders };
