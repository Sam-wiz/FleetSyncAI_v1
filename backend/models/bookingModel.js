const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    transporter_id: { type: Schema.Types.ObjectId, ref: 'Transporter', required: true },
    booking_date: { type: Date, required: true },
    delivery_date: { type: Date, required: true },
    isCompleted: { type: Boolean, default: false },
    truck_id: { type: Schema.Types.ObjectId, ref: 'Truck', required: true },
    path_id: { type: String, required: true },  
    payload: { type: String, required: true }
});

const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;
