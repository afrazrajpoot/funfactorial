const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const {
  registerUser,
  getAllUser,
  getUserLocation,
  loginUser,
  toggleType,
} = require("../controllers/register");
router.route("/registerUser").post(registerUser);
router.route("/getUsers").post(getAllUser);
router.route("/getUserLocation").post(getUserLocation);
router.route("/login").post(loginUser);
router.route("/userType/:id").post(toggleType);
module.exports = router;
