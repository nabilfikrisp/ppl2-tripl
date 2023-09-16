const bcrypt = require('bcryptjs');
const User = require('../models/user');

const getAll = async (request, response) => {
  try {
    const users = await User.find({});
    return response.json(users);
  } catch (error) {
    return response.status(400).json({ error: `${error}` });
  }
};

const detail = async (request, response) => {
  const { id } = request.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return response.status(404).json('there are no users yet');
    }
    return response.json(user);
  } catch (error) {
    return response.status(400).json({ error: `${error}` });
  }
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

module.exports = { getAll, userSeeders, detail };
