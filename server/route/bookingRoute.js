const express = require("express")
const router = express.Router()
const { createBooking } = require("../controllers/bookingControler")
router.route('/booking').post(createBooking)
module.exports = router