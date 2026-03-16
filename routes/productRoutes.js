const express = require("express");
const router = express.Router();
const products = require("../data/products");

// GET products
router.get("/", (req, res) => {
  res.json(products);
});

// ADD product
router.post("/", (req, res) => {
  const { name, price, stock } = req.body;

  const newProduct = {
    id: products.length + 1,
    name,
    price,
    stock
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// UPDATE product
router.put("/:id", (req, res) => {
  const product = products.find(p => p.id == req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  Object.assign(product, req.body);

  res.json(product);
});

// DELETE product
router.delete("/:id", (req, res) => {
  const index = products.findIndex(p => p.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  products.splice(index, 1);

  res.json({ message: "Product deleted" });
});

module.exports = router;