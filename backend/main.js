const express = require('express');
const warehouseRoutes = require('./routes_and_controllers/warehouse');
const fleetRoutes = require('./routes_and_controllers/fleet');
const bookingRoutes = require('./routes_and_controllers/booking');
const db = require('./config/mongo_db/dbConfig')

const app = express();

app.use(express.json());

app.use('/warehouse', warehouseRoutes);
app.use('/fleet', fleetRoutes);
app.use('/booking', bookingRoutes);



app.listen(5000, () => {
  console.log('Server running on port 5000');
});
