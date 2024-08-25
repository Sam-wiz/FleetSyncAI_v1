const express = require('express');
const FleetManager = require('../agents/fleetManager');

const router = express.Router();
const fleetManager = new FleetManager();

router.post('/manage_fleet', async (req, res) => {
  const { messages } = req.body;

  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: 'The messages parameter should be an array.' });
  }

  try {
    const response = await fleetManager.manageFleet(messages);
    res.json({ response });
  } catch (error) {
    console.error('Error managing fleet:', error);
    res.status(500).json({ error: 'An error occurred while managing the fleet.' });
  }
});

module.exports = router;