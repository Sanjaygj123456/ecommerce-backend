const express = require("express");
const router = express.Router();

const products = require("../data/products");
const orders = require("../data/orders");

// GET /orders
router.get("/", (req, res) => {
  res.json(orders);
});

// POST /orders
router.post("/", (req, res) => {
  const { productId, quantity } = req.body;

  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (product.stock < quantity) {
    return res.status(400).json({ message: "Not enough stock available" });
  }

  const totalPrice = product.price * quantity;

  const newOrder = {
    id: orders.length + 1,
    productId,
    quantity,
    totalPrice
  };

  orders.push(newOrder);

  product.stock -= quantity;

  res.status(201).json(newOrder);
});

module.exports = router;