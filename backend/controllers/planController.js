const Plan = require('../models/plan');

const getAll = async (request, response) => {
  const plans = await Plan.find({});
  return response.json(plans);
};

module.exports = { getAll };
