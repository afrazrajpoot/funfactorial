const cron = require("node-cron");
const bookingModel = require("../models/bookingModel");

const startBookingCleanupJob = () => {
  cron.schedule("0 */3 * * *", async () => {
    console.log("Cron job running...");

    try {
      const now = new Date();
      console.log("Current time:", now);

      // Find bookings where endDate is before the current date
      const expiredBookings = await bookingModel.find({
        endDate: { $lte: now },
      });

      console.log("Expired bookings found:", expiredBookings);

      if (expiredBookings.length > 0) {
        // Delete expired bookings
        await bookingModel.deleteMany({
          _id: { $in: expiredBookings.map((booking) => booking._id) },
        });
        console.log(`Deleted ${expiredBookings.length} expired bookings`);
      } else {
        console.log("No expired bookings to delete");
      }
    } catch (err) {
      console.error("Error deleting expired bookings:", err);
    }
  });

  console.log("Booking cleanup job scheduled to run every 10 seconds for testing");
};

module.exports = startBookingCleanupJob;
