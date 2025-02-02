const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

// Example product data
const products = [
  { _id: "1", name: "Product 1", price: 29.99 },
  { _id: "2", name: "Product 2", price: 49.99 },
];

// Route to get products
router.get("/", protect , (req, res) => {
  res.json(products);
});

module.exports = router;
