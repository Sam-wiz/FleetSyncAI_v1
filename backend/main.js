const express = require('express');
const WarehouseManager = require('./agents/warehouseManager');
const FleetManager = require('./agents/fleetManager');
const BookingManager = require('./agents/bookingManager');

const app = express();
const warehouseManager = new WarehouseManager();
const fleetManager = new FleetManager();
const bookingManager = new BookingManager();

app.use(express.json());

app.post('/warehouse/manage_inventory', async (req, res) => {
  const { warehouseId, operation, item, quantity } = req.body;
  const response = await warehouseManager.manageInventory(warehouseId, operation, item, quantity);
  res.json({ response });
});

app.post('/fleet/manage_fleet', async (req, res) => {
  const { truckId, operation } = req.body;
  const response = await fleetManager.manageFleet(truckId, operation);
  res.json({ response });
});

app.post('/booking/manage_booking', async (req, res) => {
  const { transporterId, source, destination, deadline } = req.body;
  const response = await bookingManager.manageBooking(transporterId, source, destination, deadline);
  res.json(response);
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
