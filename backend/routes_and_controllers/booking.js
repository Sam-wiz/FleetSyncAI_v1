const express = require('express');
const BookingManager = require('../agents/bookingManager');

const router = express.Router();
const bookingManager = new BookingManager();

router.post('/manage_booking', async (req, res) => {
  const { messages } = req.body;
  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: "The 'messages' field should be an array." });
  }

  try {
    const response = await bookingManager.manageBooking(messages);
    res.json(response);
  } catch (error) {
    console.error('Error in /booking/manage_booking:', error);
    res.status(500).json({ error: 'An error occurred while managing the booking.' });
  }
});

module.exports = router;