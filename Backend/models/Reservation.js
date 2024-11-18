const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  username: { type: String, required: true },
  numberOfPeople: { type: Number, required: true },
  time: { type: String, required: true },
  date: { type: Date, required: true },
  theme: { type: String, default: 'standard' } // optional field with default
});

module.exports = mongoose.model('Reservation', reservationSchema);










