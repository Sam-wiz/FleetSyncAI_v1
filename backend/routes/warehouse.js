const express = require('express');
const WarehouseManager = require('../agents/warehouseManager');

const router = express.Router();
const warehouseManager = new WarehouseManager();

router.post('/manage_inventory', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!Array.isArray(messages)) {
      throw new TypeError('The messages parameter should be an array.');
    }

    const response = await warehouseManager.manageInventory(messages);
    res.json({ response });
  } catch (error) {
    console.error('Error managing inventory:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;