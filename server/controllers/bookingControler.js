const Booking = require("../models/bookingModel");
const CustomError = require("../error/customClass");
const sendEmail = require("../utils/sendMail");

exports.createBooking = async (req, res, next) => {
  try {
    const { name, email, phone, address, startDate, endDate, itemDetail } = req.body;

    // Validate all required fields
    if (!name || !email || !phone || !address || !startDate || !endDate || !itemDetail) {
      throw new CustomError("All fields are required", 400);
    }

    // Validate item detail
    if (typeof itemDetail !== "object" || itemDetail === null) {
      throw new CustomError("Item detail must be an object", 400);
    }

    const { name: itemName, price: itemPrice } = itemDetail;
    if (!itemName || typeof itemName !== "string") {
      throw new CustomError("Item detail must include a valid name", 400);
    }

    const pricePerDay = parseFloat(itemPrice) + 125;
    if (isNaN(pricePerDay)) {
      throw new CustomError("Item price must be a valid number", 400);
    }

    // Parse dates and ensure they're valid
    let start, end;
    try {
      start = new Date(startDate);
      end = new Date(endDate);
      
      // Validate that the dates are valid
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new Error('Invalid date format');
      }
    } catch (error) {
      throw new CustomError("Invalid date format provided", 400);
    }

    const currentDate = new Date();
    if (start < currentDate.setHours(0, 0, 0, 0)) {
      throw new CustomError("Start date cannot be in the past", 400);
    }

    if (end <= start) {
      throw new CustomError("End date must be after the start date", 400);
    }

    // Find conflicting bookings for the same item
    const conflictingBookings = await Booking.find({
      "itemDetail.name": itemName,
      $or: [{ startDate: { $lte: end }, endDate: { $gte: start } }],
    });

    if (conflictingBookings.length > 0) {
      throw new CustomError(`Already booked for the selected dates`, 400);
    }

    // Calculate total price based on the number of days
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalPrice = pricePerDay * days;

    // Create a new booking
    const newBooking = new Booking({
      name,
      email,
      phone,
      address,
      startDate: start,
      endDate: end,
      itemDetail: {
        name: itemName,
        price: pricePerDay,
      },
      total: totalPrice,
    });

    const savedBooking = await newBooking.save();

    // Format dates for email template - use simple date strings
    const templateData = {
      name: savedBooking.name,
      itemDetail: savedBooking.itemDetail,
      startDate: start.toString(), // Convert to string format
      endDate: end.toString(),     // Convert to string format
      total: savedBooking.total,
      admin:true
    };

    // Send confirmation email after booking is created
    const subject = `Booking Confirmation for ${itemName}`;
    await sendEmail('funride907@gmail.com', subject, templateData);

    // Respond to the client
    res.status(201).json({
      message: `Booking successful for ${itemName} from ${start.toDateString()} to ${end.toDateString()}`,
      booking: savedBooking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    next(error);
  }
};




exports.checkinAvailibility = async (req, res, next) => {
  try {
    const { itemName } = req.body;
    // Find a single booking document
    const conflictingBookings = await Booking.findOne({
      "itemDetail.name": itemName,
    });
    // If no booking is found, it means the item is available
    if (!conflictingBookings) {
      return next(new CustomError("Booking available", 404));
    }

    // Calculate the number of days for the booking
    const startDate = new Date(conflictingBookings.startDate);
    const endDate = new Date(conflictingBookings.endDate);
    const totalDays = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));

    res.status(200).json({
      message: `Already booked for ${totalDays} days`,
    });
  } catch (err) {
    console.error("Error checking in availability:", err);
    next(err); // Pass the correct error object
  }
};

exports.getBookingDetail = async (req,res,next)=>{
  try{
    const bookingDetail = await Booking.find()
    if(!bookingDetail){
      return next(new CustomError("Boking detail not found",400))
    }
    res.status(200).json({
      bookingDetail
    })
  }catch(err){
    console.error("Error getting booking detail:", err);
    next(err); // Pass the correct error object
  }
}
exports.approveBooking = async(req,res,next)=>{
  try{
    const {email,id} = req.body;
    const savedBooking = await Booking.findById(id);
    if(!savedBooking){
      return next(new CustomError('No booking found',404))
    }

    savedBooking.status = 'approved';
    await savedBooking.save();
    const templateData = {
      name: savedBooking.name,
      itemDetail: savedBooking.itemDetail,
      startDate: savedBooking?.start?.toString(), // Convert to string format
      endDate: savedBooking?.end?.toString(),     // Convert to string format
      total: savedBooking.total,
      user :true
    };
    const subject = `Booking Confirmation for ${templateData?.itemDetail?.name}`;
    await sendEmail(email, subject, templateData);
    res.status(200).json({
      message: 'Booking approved',
      savedBooking
    })
  }catch(err){
    console.error("Error approving booking:", err);
    next(err); // Pass the correct error object
  }
}

exports.rejectBooking = async (req,res,next)=>{
  try{
    const {id} = req.body
    const savedBooking = await Booking.findById(id);
    if(!savedBooking){
      return next(new CustomError('No booking found',404))
    }
    savedBooking.status ='rejected';
    await savedBooking.save();
    res.status(200).json({
      message: 'Booking rejected',
      savedBooking
    })
  }catch(err){
    console.error("Error rejecting booking:", err);
    next(err); // Pass the correct error object
  }
}


exports.checkAvailibility = async (req, res, next) => {
  try {
    const { date } = req.body;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a date'
      });
    }

    // Convert input date to a Date object and ensure it's valid
    const targetDate = new Date(date);
    if (isNaN(targetDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format'
      });
    }

    // Set time to start of day in Pakistan timezone (UTC+5)
    const startOfDay = new Date(targetDate);
    startOfDay.setUTCHours(-5, 0, 0, 0);  // Adjust for Pakistan timezone

    // Set time to end of day in Pakistan timezone (UTC+5)
    const endOfDay = new Date(targetDate);
    endOfDay.setUTCHours(18, 59, 59, 999);  // Adjust for Pakistan timezone

    // Query to find bookings that overlap with the target date
    const bookings = await Booking.find({}).lean();
    
    // Filter bookings manually to handle string dates
    const overlappingBookings = bookings.filter(booking => {
      const bookingStartDate = new Date(booking.startDate);
      const bookingEndDate = new Date(booking.endDate);
      
      // Convert booking dates to UTC for consistent comparison
      const bookingStart = new Date(bookingStartDate);
      const bookingEnd = new Date(bookingEndDate);

      // Check if booking overlaps with target date
      return (
        // Case 1: Booking starts during target date
        (bookingStart >= startOfDay && bookingStart <= endOfDay) ||
        // Case 2: Booking ends during target date
        (bookingEnd >= startOfDay && bookingEnd <= endOfDay) ||
        // Case 3: Booking spans over target date
        (bookingStart <= startOfDay && bookingEnd >= endOfDay)
      );
    });

    // Log for debugging
    console.log({
      targetDate: startOfDay,
      targetDateEnd: endOfDay,
      bookingsFound: overlappingBookings.length,
      bookings: overlappingBookings.map(b => ({
        startDate: b.startDate,
        endDate: b.endDate,
        startDateObj: new Date(b.startDate),
        endDateObj: new Date(b.endDate)
      }))
    });

    if (overlappingBookings.length > 0) {
      return res.status(200).json({
        success: true,
        available: false,
        message: 'Date is not available',
        existingBookings: overlappingBookings,
        requestedDate: startOfDay
      });
    }

    return res.status(200).json({
      success: true,
      available: true,
      message: 'Date is available for booking',
      requestedDate: startOfDay
    });

  } catch (err) {
    console.error("Error checking booking availability:", err);
    return res.status(500).json({
      success: false,
      message: 'Error checking availability',
      error: err.message
    });
  }
};

