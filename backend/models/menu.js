import categorySchema from './category.js'

const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  price: {
    type: number,
    required: true,
  },
  category: {
    type: categorySchema,
    required: true
  }
});

module.exports = mongoose.model("Menu", menuSchema);
