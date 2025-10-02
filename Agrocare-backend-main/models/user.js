const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'farmer', 'user'],
    default: 'user',
  },
  profile: {
    full_name: String,
    phone: String,
    address: {
      street: String,
      city: String,
      state: String,
      zip_code: String,
    },
  },
  cart: [
    {
      product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: Number,
    },
  ],
  orders: [
    {
      order_id: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
      },
      order_date: Date,
      status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered'],
        default: 'pending',
      },
    },
  ],
  // Reference to equipment listings for farmers
  equipment: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Equipment',
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
