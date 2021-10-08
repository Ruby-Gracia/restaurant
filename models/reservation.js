const mongoose = require("mongoose");

const { Schema } = mongoose;
const reservationSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  startAt: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "showtime",
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  ticketPrice: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cinema",
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  movieId: {
    type: Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  cinemaId: {
    type: Schema.Types.ObjectId,
    ref: "Cinema",
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  checkin: {
    type: Boolean,
    default: false,
  },
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
