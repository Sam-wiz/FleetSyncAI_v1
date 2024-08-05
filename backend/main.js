// main.js
const express = require('express');
const warehouseRoutes = require('./routes/warehouse');
const fleetRoutes = require('./routes/fleet');
const bookingRoutes = require('./routes/booking');

const app = express();

app.use(express.json());

app.use('/warehouse', warehouseRoutes);
app.use('/fleet', fleetRoutes);
app.use('/booking', bookingRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
