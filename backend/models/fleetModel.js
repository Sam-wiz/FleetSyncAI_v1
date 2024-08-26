const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TruckSchema = new Schema({
    driver_id: { type: Schema.Types.ObjectId, ref: 'Driver', required: true },
    city_id: { type: String, required: true }, 
    status: { type: Boolean, default: false },
    location: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const Truck = mongoose.model('Truck', TruckSchema);
module.exports = Truck;
