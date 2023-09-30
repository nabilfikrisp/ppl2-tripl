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

const myPlan = async (request, response) => {
  const { includeCreator, includeLocations } = request.query;
  const user = request.user;
  console.log(user, 'user');
  const plans = Plan.find({ creator: user.id });

  if (includeCreator) {
    plans.populate({
      path: 'creator',
      select: 'name email',
    });
  }

  if (includeLocations) {
    plans.populate({
      path: 'locations.location',
    });
  }

  const myPlans = await plans.exec();
  return response.json(myPlans);
};

const detail = async (request, response) => {
  const { id } = request.params;
  const plan = await Plan.findById(id);
  return response.json(plan);
};

const save = async (request, response) => {
  const { date, title, description, locations } = request.body;
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
    locations,
  });

  const savedPlan = await plan.save();
  user.plans = [...user.plans, savedPlan];

  await user.save();

  return response.status(201).json(savedPlan);
};

module.exports = { getAll, detail, save, myPlan };
