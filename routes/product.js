const Product = require("../models/product");
const router = require("express").Router();
const verify = require("../verify");

router.post("/", verify, async (req, res) => {
    console.log(req.user)
  if (req.user.role == "admin") {
    const newProduct = new Product(req.body);
    try {
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not allowed");
  }
});

router.get("/", verify, async (req, res) => {
  if (req.user.role == "admin" || req.user.role == "manager") {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not allowed");
  }
});

router.put("/:id", verify, async (req, res) => {
  if (req.user.role == "admin" || req.user.role == "manager") {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not allowed");
  }
});

module.exports = router;
