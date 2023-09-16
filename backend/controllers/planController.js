const Plan = require('../models/plan');

const getAll = async (request, response) => {
  const { includeCreator } = request.query;
  const plans = Plan.find({});
  if (includeCreator) {
    plans.populate('creator', {
      name: 1,
      email: 1,
    });
  }
  const getPlans = await plans.exec();
  return response.json(getPlans);
};

const detail = async (request, response) => {
  const { id } = request.params;
  const plan = await Plan.findById(id);
  return response.json(plan);
};

const save = async (request, response) => {
  const { date, title, description } = request.body;
  const user = request.user;

  if (!date) {
    return response.status(400).json('request should contain date');
  }
  if (!title) {
    return response.status(400).json('request should contain title');
  }

  const plan = new Plan({
    title,
    date,
    description,
    creator: user.id,
  });

  const savedPlan = await plan.save();
  user.plans = [...user.plans, savedPlan];

  await user.save();

  return response.status(201).json(savedPlan);
};

module.exports = { getAll, detail, save };
