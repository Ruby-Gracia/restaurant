const mongoose = require("mongoose");

const { Schema } = mongoose;

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  cityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
  },
  description: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  rating: {
    type: Number
  }
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
