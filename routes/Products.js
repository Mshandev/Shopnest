const express = require("express");
const router = express.Router();
const {
  createProduct,
  fetchAllProducts,
  fetchProductById,
  updateProduct,
  fetchProductsBySearch,
  fetchFeatureProducts
} = require("../controller/Product");

router
  .post("/", createProduct)
  .get("/", fetchAllProducts)
  .get("/search", fetchProductsBySearch)
  .get("/feature", fetchFeatureProducts)
  .get("/:id", fetchProductById)
  .patch("/:id",updateProduct);

exports.router = router;
