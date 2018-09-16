const mongoose = require("mongoose");

var ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
  },
  categories: [mongoose.Schema.Types.ObjectId]
});

var Product = mongoose.model("Product", ProductSchema);

module.exports = {
  Product
};
