const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// Get all reservations
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ message: 'Error fetching reservations.' });
  }
});

// Create a new reservation
router.post('/', async (req, res) => {
  const { username, numberOfPeople, time, date, theme } = req.body;

  if (!username || !numberOfPeople || !time || !date) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  const reservation = new Reservation({
    username,
    numberOfPeople,
    time,
    date,
    theme
  });

  try {
    const savedReservation = await reservation.save();
    res.status(201).json(savedReservation);
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ message: 'Error creating reservation.' });
  }
});

// Delete a reservation by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReservation = await Reservation.findByIdAndDelete(id);
    if (!deletedReservation) {
      return res.status(404).json({ message: 'Reservation not found.' });
    }
    res.json({ message: 'Reservation deleted successfully.' });
  } catch (error) {
    console.error('Error deleting reservation:', error);
    res.status(500).json({ message: 'Error deleting reservation.' });
  }
});

module.exports = router;
