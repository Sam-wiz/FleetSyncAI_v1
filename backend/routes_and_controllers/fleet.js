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
router.get('/trucks', async (req, res) => {
  try {
      const trucks = await Truck.find();
      res.json(trucks);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});
router.get('/trucks/:id', async (req, res) => {
  try {
      const truck = await Truck.findById(req.params.id);
      if (!truck) return res.status(404).json({ message: 'Truck not found' });
      res.json(truck);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});
module.exports = router;