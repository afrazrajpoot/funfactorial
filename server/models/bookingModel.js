const mongoose = require("mongoose");

// Item schema for item details in the booking
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

// Booking schema
const bookingSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },

    itemDetail: {
      type: itemSchema,
      required: true,
    },
    status: {
      type: String,
      default: 'pendenig',
    },
    total: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
