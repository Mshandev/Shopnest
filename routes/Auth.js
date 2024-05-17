const express = require("express");
const {createUserByAdmin, createUser, loginUser, checkAuth, resetPasswordRequest, resetPassword, logout } = require("../controller/Auth");
const passport = require("passport");

const router = express.Router();

router
  .post("/signup", createUser)
  .post("/adduser", createUserByAdmin)
  .post("/login", passport.authenticate("local"), loginUser)
  .get("/check", passport.authenticate("jwt"), checkAuth)
  .get("/logout", logout)
  .post("/reset-password-request",resetPasswordRequest)
  .post("/reset-password",resetPassword);

exports.router = router;
