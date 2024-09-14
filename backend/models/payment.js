const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    price: {
      type: Number,
      required: true,
    },
    paymentImg: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // This adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Payment", paymentSchema);
