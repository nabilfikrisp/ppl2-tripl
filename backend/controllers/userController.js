const mongoose = require('mongoose');
const User = require('../models/user');

const getAll = async (request, response) => {
  const { includePlans } = request.query;
  const users = User.find({});
  if (includePlans) {
    users.populate('plans', {
      title: 1,
      description: 1,
      id: 1,
      date: 1,
      locations: 1,
    });
  }
  const getUsers = await users.exec();
  return response.json(getUsers);
};

const detail = async (request, response) => {
  const { id } = request.params;
  try {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      return response.status(404).json('User not found');
    }
    const user = await User.findById(id);
    if (!user) {
      return response.status(404).json('User not found');
    }
    return response.json(user);
  } catch (error) {
    // istanbul ignore next: This line is excluded from test coverage
    return response.status(500).json({ error: `${error}` });
  }
};

module.exports = { getAll, detail };
