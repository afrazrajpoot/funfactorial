const cron = require('node-cron');
const mongoose = require('mongoose');
const BookingModel = require('../models/bookingModel');

const CLEANUP_INTERVAL = '0 * * * *'; // Run every hour

async function cleanupExpiredBookings() {
  const now = new Date();
  // Setting current date to midnight UTC
  const currentDateMidnightUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

  try {
    // Delete bookings where endDate is less than the current date (midnight UTC)
    const result = await BookingModel.deleteMany({ endDate: { $lt: currentDateMidnightUTC } });
  } catch (error) {
    console.error('Error during booking cleanup:', error);
  }
}

function startBookingCleanupJob() {
  cron.schedule(CLEANUP_INTERVAL, cleanupExpiredBookings, {
    scheduled: true,
    timezone: 'UTC',
  });

}

module.exports = startBookingCleanupJob;
