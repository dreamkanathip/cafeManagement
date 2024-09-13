const categorySchema = require('./category.js')

const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});

module.exports = mongoose.model("Menu", menuSchema);
