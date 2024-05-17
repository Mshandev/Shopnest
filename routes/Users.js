const express = require("express");
const { fetchUserById, updateUser, fetchAllUsers, deleteUser } = require("../controller/User");
const router = express.Router();

router
  .get("/own", fetchUserById)
  .patch("/:id", updateUser)
  .get("/", fetchAllUsers)
  .delete("/:id", deleteUser);

exports.router = router;
