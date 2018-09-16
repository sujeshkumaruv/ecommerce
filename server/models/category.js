const mongoose = require("mongoose");

var CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    default: null
  },
  children: [mongoose.Schema.Types.ObjectId]
});

var Category = mongoose.model("Category", CategorySchema);

module.exports = {
  Category
};
