const mongoose = require('mongoose');
const Plan = require('../models/plan');
const User = require('../models/user');

const ObjectId = mongoose.Types.ObjectId;

const getAll = async (request, response) => {
  const { includeCreator, includeLocations } = request.query;
  try {
    const plans = Plan.find({});
    if (includeCreator) {
      plans.populate('creator', {
        name: 1,
        email: 1,
      });
    }

    if (includeLocations) {
      plans.populate({
        path: 'locations.location',
      });
    }
    const getPlans = await plans.exec();
    return response.json(getPlans);
  } catch (error) {
    // istanbul ignore next: This line is excluded from test coverage
    return response.status(500).error(error);
  }
};

const myPlan = async (request, response) => {
  const { includeCreator, includeLocations } = request.query;
  const user = request.user;
  try {
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
  } catch (error) {
    // istanbul ignore next: This line is excluded from test coverage
    return response.status(500).error(error);
  }
};

const detail = async (request, response) => {
  const { id } = request.params;
  const { includeCreator, includeLocations } = request.query;
  try {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      return response.status(404).json('Plan not found');
    }
    const plan = Plan.findById(id);

    if (includeCreator) {
      plan.populate({
        path: 'creator',
        select: 'name email',
      });
    }

    if (includeLocations) {
      plan.populate({
        path: 'locations.location',
      });
    }
    const detailPlan = await plan.exec();
    if (!detailPlan) {
      return response.status(404).json('Plan not found');
    }
    return response.json(detailPlan);
  } catch (error) {
    // istanbul ignore next: This line is excluded from test coverage
    return response.status(500).json({ error: 'Internal Server Error' });
  }
};

const update = async (request, response) => {
  const { id } = request.params;
  const { date, title, description, locations } = request.body;
  const user = request.user;
  try {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      return response.status(404).json('Plan not found');
    }

    const oldPlan = await Plan.findById(id);
    if (!oldPlan) {
      return response.status(404).json('Plan not found');
    }
    if (user.id !== oldPlan.creator.toString()) {
      return response.status(401).end();
    }

    const updatePlan = Plan.findByIdAndUpdate(
      id,
      { date, title, description, locations },
      {
        new: true,
        runValidators: true,
        context: 'query',
      }
    );

    updatePlan.populate({
      path: 'creator',
      select: 'name email',
    });
    updatePlan.populate({
      path: 'locations.location',
    });

    const updatedPlan = await updatePlan.exec();

    return response.json(updatedPlan);
  } catch (error) {
    // istanbul ignore next: This line is excluded from test coverage
    return response.status(500).error(error);
  }
};

const save = async (request, response) => {
  const { date, title, description, locations } = request.body;
  const user = request.user;

  try {
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
  } catch (error) {
    // istanbul ignore next: This line is excluded from test coverage
    return response.status(500).error(error);
  }
};

const destroy = async (request, response) => {
  const { id } = request.params;
  const user = request.user;

  try {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      return response.status(404).json('Plan not found');
    }

    const oldPlan = await Plan.findById(id);
    if (!oldPlan) {
      return response.status(404).json('Plan not found');
    }
    if (user.id !== oldPlan.creator.toString()) {
      return response.status(401).end();
    }

    const objectIdToRemove = new ObjectId(id);

    await User.findByIdAndUpdate(
      user._id,
      { $pull: { plans: objectIdToRemove } },
      { new: true }
    );

    await Plan.findByIdAndDelete(id);

    return response.status(204).end();
  } catch (error) {
    // istanbul ignore next: This line is excluded from test coverage
    return response.status(500).error(error);
  }
};

module.exports = { getAll, detail, save, myPlan, update, destroy };
