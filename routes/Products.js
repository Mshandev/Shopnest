const express = require("express");
const router = express.Router();
const {
  createProduct,
  fetchAllProducts,
  fetchProductById,
  updateProduct,
  fetchProductsBySearch
} = require("../controller/Product");

router
  .post("/", createProduct)
  .get("/", fetchAllProducts)
  .get("/search", fetchProductsBySearch)
  .get("/:id", fetchProductById)
  .patch("/:id",updateProduct);

exports.router = router;
