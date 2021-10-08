const mongoose = require("mongoose");

const { Schema } = mongoose;
const menuSchema = new Schema({
  restaurantId: {
    type: mongoose.Schema.Types.Mixed,
    ref: "Restaurant",
  },
  title: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  price: {
    type: String,
    required: true
  }
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;