const express = require("express");
const router = express.Router();

let categories = [];

// GET categories
router.get("/", (req, res) => {
  res.json(categories);
});

// ADD category
router.post("/", (req, res) => {
  const newCategory = {
    id: categories.length + 1,
    name: req.body.name
  };

  categories.push(newCategory);
  res.status(201).json(newCategory);
});

module.exports = router;