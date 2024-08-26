const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WarehouseSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    city_id: { type: String, required: true }, 
    capacity: { type: Number, required: true },
    availability: { type: Boolean, default: true },
    price_per_day: { type: Number, required: true }
});

const Warehouse = mongoose.model('Warehouse', WarehouseSchema);
module.exports = Warehouse;
