const express = require("express");
const {
  fetchBrands,
  createBrand,
  fetchAllBrands,
  updateBrand,
  deleteBrand,
  fetchBrandById,
} = require("../controller/Brand");
const router = express.Router();

router
  .get("/", fetchBrands)
  .post("/", createBrand)
  .get("/brands", fetchAllBrands)
  .patch("/:id", updateBrand)
  .delete("/:id", deleteBrand)
  .get("/:id", fetchBrandById);

exports.router = router;
