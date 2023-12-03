const mongoose = require('mongoose');
const Location = require('../models/location');

const getAll = async (request, response) => {
  const { type, page, pageSize, search, mostViewed } = request.query;
  try {
    let query = type ? Location.find({ type }) : Location.find({});

    if (search) {
      query = query.or([
        { name: { $regex: new RegExp(search, 'i') } },
        { address: { $regex: new RegExp(search, 'i') } },
      ]);
    }

    if (mostViewed) {
      query = query.sort({ reviewCount: -1 });
    }

    if (page !== undefined && pageSize !== undefined) {
      const skipAmount = (Number(page) - 1) * Number(pageSize);

      query = query.skip(skipAmount).limit(Number(pageSize));
    }

    if (pageSize && page === undefined) {
      query = query.skip(0).limit(Number(pageSize));
    }

    const locations = await query.exec();
    return response.json(locations);
  } catch (error) {
    // istanbul ignore next: This line is excluded from test coverage
    return response.status(500).json({ error: 'Internal Server Error' });
  }
};

const detail = async (request, response) => {
  const { id } = request.params;
  try {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      return response.status(404).json('Location not found');
    }
    const location = await Location.findById(id);
    if (!location) {
      return response.status(404).json('Location not found');
    }
    return response.json(location);
  } catch (error) {
    // istanbul ignore next: This line is excluded from test coverage
    return response.status(500).json({ error: `${error}` });
  }
};

module.exports = { getAll, detail };
