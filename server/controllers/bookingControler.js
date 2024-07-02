const CustomError = require("../error/customClass");
const Booking = require("../models/bookingModel"); // Adjust the path as per your project structure
const sendEmail = require("../utils/sendMail");

// Create a new booking with availability check
exports.createBooking = async (req, res, next) => {
  try {
    // Extract date and time from request body
    const { date, time } = req.body;

    // Check if there's already a booking for the same date and time
    const existingBooking = await Booking.findOne({ date, time });
    // const
    if (existingBooking) {
      return next(new CustomError("Booking not available", 400));
    }

    // If no existing booking, proceed to create a new booking
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();
    // if()
    // console.log(savedBooking);
    if (savedBooking) {
      sendEmail(
        "recipient@example.com",
        "Test Subject",
        "This is a test email",
        "<b>This is a test email</b>"
      );
    }
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
