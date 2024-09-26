const express = require("express");
const router = express.Router();
const { createBooking, checkinAvailibility, getBookingDetail } = require("../controllers/bookingControler");
router.route("/booking").post(createBooking);
router.route("/availability").post(checkinAvailibility);
router.route('/bookingDetail').get(getBookingDetail)
module.exports = router;
