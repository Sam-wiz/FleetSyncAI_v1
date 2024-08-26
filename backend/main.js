const express = require('express');
const warehouseRoutes = require('./routes_and_controllers/warehouse');
const fleetRoutes = require('./routes_and_controllers/fleet');
const bookingRoutes = require('./routes_and_controllers/booking');
const db = require('./config/mongo_db/dbConfig')
const auth = require('./routes_and_controllers/auth')
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use('/warehouse', warehouseRoutes);
app.use('/fleet', fleetRoutes);
app.use('/booking', bookingRoutes);
app.use('/auth', auth);


app.listen(5000, () => {
  console.log('Server running on port 5000');
});
