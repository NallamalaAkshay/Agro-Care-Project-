const mongoose = require('mongoose');
const { Schema } = mongoose;

const equipmentSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  rental_price: { type: Number, required: true },
  availability_status: { type: String, enum: ['available', 'rented'], default: 'available' },
  contact_email: { type: String, required: true },
  contact_number: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String }, // URL or path to the equipment image
  farmer: { type: String, required: true }, // Link to the farmer (user)
  created_at: { type: Date, default: Date.now },
});

const Equipment = mongoose.model('Equipment', equipmentSchema);

module.exports = Equipment;
