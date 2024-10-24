import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGetBookingDetailQuery } from '../store/storeApi';
import { FaUsers, FaCalendarCheck, FaMoneyBillWave, FaSpinner, FaInfoCircle, FaTimes } from 'react-icons/fa';

const Admin = () => {
  const { isLoading, isError, error, isSuccess, data } = useGetBookingDetailQuery();
  const [selectedBooking, setSelectedBooking] = useState(null);
console.log(data,'my data')
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  const totalBookings = data?.bookingDetail.length || 0;
  const totalRevenue = data?.bookingDetail.reduce((sum, booking) => sum + booking.total, 0) || 0;
  const activeBookings = data?.bookingDetail.filter(booking => new Date(booking.endDate) > new Date()).length || 0;

  const BookingModal = ({ booking, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className="bg-white rounded-lg p-6 max-w-2xl w-full"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Booking Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Name:</p>
            <p>{booking.name}</p>
          </div>
          <div>
            <p className="font-semibold">Email:</p>
            <p>{booking.email}</p>
          </div>
          <div>
            <p className="font-semibold">Phone:</p>
            <p>{booking.phone}</p>
          </div>
          <div>
            <p className="font-semibold">Address:</p>
            <p>{booking.address}</p>
          </div>
          <div>
            <p className="font-semibold">Start Date:</p>
            <p>{new Date(booking.startDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="font-semibold">End Date:</p>
            <p>{new Date(booking.endDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="font-semibold">Total:</p>
            <p>${booking.total.toFixed(2)}</p>
          </div>
          <div>
            <p className="font-semibold">Booked:</p>
            <p>{booking.book ? 'Yes' : 'No'}</p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Item Details:</h3>
          <pre className="bg-gray-100 p-2 rounded overflow-x-auto">
            {JSON.stringify(booking.itemDetail, null, 2)}
          </pre>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen"
    >
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { title: 'Total Bookings', value: totalBookings, icon: FaUsers, color: 'from-blue-400 to-blue-600' },
          { title: 'Active Bookings', value: activeBookings, icon: FaCalendarCheck, color: 'from-green-400 to-green-600' },
          { title: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}`, icon: FaMoneyBillWave, color: 'from-yellow-400 to-yellow-600' },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gradient-to-r ${item.color} text-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-75">{item.title}</p>
                <p className="text-3xl font-bold">{item.value}</p>
              </div>
              <item.icon className="text-4xl opacity-75" />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <h2 className="text-2xl font-semibold mb-4">Recent Bookings</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Start Date</th>
                <th className="p-3">End Date</th>
                <th className="p-3">Total</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.bookingDetail.slice(0, 5).map((booking, index) => (
                <motion.tr
                  key={booking._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3">{booking.name}</td>
                  <td className="p-3">{booking.email}</td>
                  <td className="p-3">{new Date(booking.startDate).toLocaleDateString()}</td>
                  <td className="p-3">{new Date(booking.endDate).toLocaleDateString()}</td>
                  <td className="p-3">${booking.total.toFixed(2)}</td>
                  <td className="p-3">
                    <button
                      onClick={() => setSelectedBooking(booking)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaInfoCircle />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedBooking && (
          <BookingModal
            booking={selectedBooking}
            onClose={() => setSelectedBooking(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};
export default Admin