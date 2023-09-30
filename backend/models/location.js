const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  googleId: String,
  placeId: String,
  phoneNumber: String,
  name: String,
  description: String,
  latitude: Number,
  longitude: Number,
  address: String,
  reviewCount: Number,
  rating: Number,
  placeLink: String,
  reviewsLink: String,
  type: String,
  photo: String,
});

locationSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
