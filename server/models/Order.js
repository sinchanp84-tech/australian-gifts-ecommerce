const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerName: String,
  email: String,
  items: Array,
  totalAmount: Number,

  status: {
    type: String,
    default: "Pending",
  },

  orderDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);