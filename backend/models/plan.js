const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  date: {
    type: Date,
    required: true,
  },
  locations: [
    {
      location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: [
          true,
          'location is required and time range must be included',
        ],
      },
      timeRange: {
        type: String,
        required: [
          true,
          'time range is required and location must be included',
        ],
      },
    },
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

planSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;
