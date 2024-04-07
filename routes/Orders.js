const express = require("express");
const { fetchOrdersByUser, createOrder, deleteOrder, updateOrder, fetchAllOrders } = require("../controller/Order");

const router = express.Router();

router
  .get("/own/", fetchOrdersByUser)
  .post("/", createOrder)
  .delete("/:id", deleteOrder)
  .patch("/:id", updateOrder)
  .get("/",fetchAllOrders);

exports.router = router;
