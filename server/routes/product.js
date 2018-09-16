const express = require("express");
const _ = require("lodash");
const mongoose = require("mongoose");

const router = express.Router();

const { Product } = require("./../models/product");

router.post("/", async (req, res) => {
  try {
    var body = _.pick(req.body, ["name", "price", "categories"]);
    var product = new Product(body);
    var newProduct = await product.save();
    res.send(newProduct);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch("/:id", async (req, res) => {
  var id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send();
  }
  var body = _.pick(req.body, ["name", "price"]);
  let product = await Product.findByIdAndUpdate(id, body, { new: true });
  if (!product) {
    return res.status(404).send();
  }
  res.send(product);
});

module.exports = router;
