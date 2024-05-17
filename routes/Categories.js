const express=require('express');
const { fetchCategories, createCategory, fetchAllCategories, updateCategory, deleteCategory, fetchCategoryById } = require('../controller/Category');
const router=express.Router();

router.get('/',fetchCategories).post('/',createCategory)
.get("/categories", fetchAllCategories)
  .patch("/:id", updateCategory)
  .delete("/:id", deleteCategory)
  .get("/:id", fetchCategoryById);;

exports.router=router;