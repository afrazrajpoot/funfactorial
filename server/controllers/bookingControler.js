const Booking = require("../models/bookingModel");
const CustomError = require("../error/customClass");
const sendEmail = require("../utils/sendMail");
const AdminEmail = require("../utils/AdminEmail");
const contactMail = require("../utils/contactMail");

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
    console.log(itemDetail,'item detail')
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
    await AdminEmail('funrides@abchomeservices.co.uk', subject, templateData);

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


// exports.checkAvailibility = async (req, res) => {
//   try {
//     const { date } = req.body;
//     console.log(date,'new date')
//     // Parse the date from client input in UTC
//     const requestedDate = new Date(date);
//     console.log('Requested Date:', requestedDate);

//     // Validate the date format
//     if (isNaN(requestedDate.getTime())) {
//       return res.status(400).json({ message: 'Invalid date format.' });
//     }

//     // Normalize the requested date by setting time to 00:00:00 for comparison
//     const normalizedRequestedDate = new Date(
//       requestedDate.getFullYear(),
//       requestedDate.getMonth(),
//       requestedDate.getDate()
//     );

//     console.log('Normalized Requested Date:', normalizedRequestedDate);

//     // Query bookings with dates that overlap the normalized date
//     const bookingsWithinRange = await Booking.find({
//       $or: [
//         // Bookings that start and end on the requested date
//         {
//           startDate: { $lte: normalizedRequestedDate },
//           endDate: { $gte: normalizedRequestedDate },
//         },
//         // Bookings that start on or before the requested date and end after the requested date
//         {
//           startDate: { $lte: normalizedRequestedDate },
//           endDate: { $gt: normalizedRequestedDate },
//         },
//         // Bookings that start after the requested date and end on or after the requested date
//         {
//           startDate: { $gte: normalizedRequestedDate },
//           endDate: { $gte: normalizedRequestedDate },
//         },
//       ],
//     });
// console.log(bookingsWithinRange,'bookinngs')
//     // Check if there are any bookings within the date range
//     if (bookingsWithinRange.length > 0) {
//       return res.status(200).json({
//         available: false,
//         message: 'No bookings available for this date.',
//         bookings: bookingsWithinRange,
//       });
//     } else {
//       return res.status(200).json({
//         available: true,
//         message: 'Bookings are available for this date.',
//         bookings: [],
//       });
//     }
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: 'Server error.' });
//   }
// };  


exports.checkAvailibility = async (req, res) => {
  try {
    const { date } = req.body;

    console.log("Requested Date (raw):", date);

    // Convert the input date string to a JavaScript Date object
    const requestedDate = new Date(date);

    // Validate the date
    if (isNaN(requestedDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format." });
    }

    // Normalize the date for comparison (start of the day and end of the day)
    const startOfDay = new Date(requestedDate);
    startOfDay.setHours(0, 0, 0, 0); // Midnight of the requested date

    const endOfDay = new Date(requestedDate);
    endOfDay.setHours(23, 59, 59, 999); // End of the day (11:59:59.999)

    console.log("Start of Day:", startOfDay);
    console.log("End of Day:", endOfDay);

    // Query for bookings where the requested date overlaps with startDate or endDate
    const bookingsOnDate = await Booking.find({
      $or: [
        {
          startDate: { $gte: startOfDay, $lte: endOfDay }, // Booking starts within the requested date
        },
        {
          endDate: { $gte: startOfDay, $lte: endOfDay }, // Booking ends within the requested date
        },
        {
          $and: [
            { startDate: { $lte: startOfDay } }, // Booking starts before or on the requested date
            { endDate: { $gte: endOfDay } }, // Booking ends after or on the requested date
          ],
        },
        {
          $and: [
            { startDate: { $lte: endOfDay } }, // Booking starts before or on the requested date
            { endDate: { $gte: startOfDay } }, // Booking ends after or on the requested date
          ],
        },
      ],
    });

    console.log("Bookings on Date:", bookingsOnDate);

    // Respond based on the results
    if (bookingsOnDate.length > 0) {
      return res.status(200).json({
        available: false,
        message: "No bookings available for this date.",
        bookings: bookingsOnDate,
      });
    }

    return res.status(200).json({
      available: true,
      message: "Bookings are available for this date.",
      bookings: [],
    });
  } catch (err) {
    console.error("Error checking availability:", err);
    return res.status(500).json({ message: "Server error." });
  }
};



const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "info@funrides.co.uk";

exports.contact = async (req, res, next) => {
  try {
    const { name, email, phone, message } = req.body;

    // Input validation
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, email, phone, message) are required.",
      });
    }

    // Prepare template data
    const templateData = {
      name,
      email,
      phone,
      message,
    };

    // Send email to the admin
    const subject = "New Contact Form Submission";
    const info = await contactMail(ADMIN_EMAIL, subject, templateData);

    // Respond to the client
    res.status(200).json({
      success: true,
      message: "Your message has been sent successfully.",
      emailInfo: info, // Optional: Include email info for debugging (remove in production)
    });
  } catch (err) {
    console.error("Error contacting:", err.message);

    // Handle nodemailer-specific errors or rethrow for middleware
    if (err.response) {
      return res.status(500).json({
        success: false,
        message: "Failed to send the email. Please try again later.",
        error: err.response,
      });
    }

    // Pass other errors to error-handling middleware
    next(err);
  }
};
