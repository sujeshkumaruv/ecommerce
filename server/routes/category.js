const express = require("express");
const _ = require("lodash");
const mongoose = require("mongoose");

const router = express.Router();

const { Category } = require("./../models/category");
const { Product } = require("./../models/product");

router.post("/", async (req, res) => {
  var body = _.pick(req.body, ["name", "parent"]);

  try {
    var category = new Category(body);
    var newCategory = await category.save();
    var parent = newCategory.parent;
    if (parent) {
      while (parent) {
        var category = await Category.findOneAndUpdate(
          { _id: parent },
          { $push: { children: newCategory._id } },
          {
            new: true
          }
        );
        parent = category.parent;
      }
    }
    res.send(newCategory);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/", async (req, res) => {
  try {
    let categories = [];
    let results = await Category.find();

    for (let i = 0; i < results.length; i++) {
      let categoryObject = {
        _id: results[i].id,
        name: results[i].name,
        children: []
      };

      for (let j = 0; j < results[i].children.length; j++) {
        let childCategory = await Category.findById(results[i].children[j]);
        categoryObject.children.push({
          _id: childCategory.id,
          name: childCategory.name
        });
      }
      categories.push(categoryObject);
    }
    res.send(categories);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/:id/products", async (req, res) => {
  try {
    let id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send();
    }
    let category = await Category.findById(id);
    console.log(category.id);
    let products = await Product.find({
      categories: { $all: [`${category.id}`] }
    });

    res.send(products);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
