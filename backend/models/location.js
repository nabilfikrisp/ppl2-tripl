const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: String,
  description: String,
  latitude: Number,
  longitude: Number,
  address: String,
  type: String,
  openHours: String,
  minPrice: Number,
  rating: Number,
  photo: String,
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
