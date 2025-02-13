'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApprovebookingMutation, useGetBookingDetailQuery, useRejectbookingMutation } from '../../store/storeApi';
import { FaUsers, FaCalendarCheck, FaMoneyBillWave, FaSpinner, FaCheckCircle } from 'react-icons/fa';
import CryptoJS from 'crypto-js';
import Link from 'next/link';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

// Dynamically import components
const BookingModal = React.lazy(() => import('@/components/BookingModal'));
const Pagination = React.lazy(() => import('@/components/Pagination'));
// const CreateBlogButton = React.lazy(() => import('@/components/CreateBlogButton'));

const Admin = () => {
  const { isLoading, isError, error, isSuccess, data } = useGetBookingDetailQuery();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookings, setBookings] = useState([]);
  const { push: navigate } = useRouter();

  const [approveBooking, { isLoading: approveLoading }] = useApprovebookingMutation();
  const [processingBooking, setProcessingBooking] = useState(null);
  const [rejectBooking, { isError: rejectError, isLoading: rejectLoading }] = useRejectbookingMutation();
  const encryptionKey = process.env.NEXT_PUBLIC_SECRET_KEY;
  const adminEmail = 'admin@gmail.com';
  const adminPassword = 'admin';
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(5);

  useEffect(() => {
    if (data?.bookingDetail) {
      setBookings(data.bookingDetail.map(booking => ({
        ...booking,
        status: booking.status || 'pending',
      })));
    }
  }, [data]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedEmail = localStorage.getItem('adminEmail');
      const storedPassword = localStorage.getItem('adminPassword');

      if (storedEmail && storedPassword) {
        const decryptedEmail = CryptoJS.AES.decrypt(storedEmail, encryptionKey).toString(CryptoJS.enc.Utf8);
        const decryptedPassword = CryptoJS.AES.decrypt(storedPassword, encryptionKey).toString(CryptoJS.enc.Utf8);

        if (decryptedEmail !== adminEmail || decryptedPassword !== adminPassword) {
          navigate('/');
        }
      } else {
        navigate('/');
      }
    }
  }, [navigate]);

  const handleApproval = async (booking, status) => {
    setProcessingBooking(booking._id);
    try {
      const promise = approveBooking({ email: booking.email, id: booking._id }).unwrap();
      
      toast.promise(promise, {
        loading: 'Processing booking...',
        success: () => {
          setBookings(prev =>
            prev.map(b =>
              b._id === booking._id ? { ...b, status } : b
            )
          );
          setSelectedBooking(null); // Close the modal on success
          return `Booking ${status === 'approved' ? 'approved' : 'rejected'} successfully`;
        },
        error: (err) => `Error: ${err.message || 'Something went wrong'}`,
      });

      await promise;
    } catch (error) {
      // Error is handled by toast.promise
    } finally {
      setProcessingBooking(null);
    }
  };

  const handleReject = async (booking) => {
    try {
      const promise = rejectBooking({ id: booking._id }).unwrap();
      
      toast.promise(promise, {
        loading: 'Processing rejection...',
        success: () => {
          setBookings(prev =>
            prev.map(b =>
              b._id === booking._id ? { ...b, status: 'rejected' } : b
            )
          );
          setSelectedBooking(null); // Close the modal on success
          return 'Booking rejected successfully';
        },
        error: (err) => `Error: ${err.message || 'Something went wrong'}`,
      });

      await promise;
    } catch (error) {
      // Error is handled by toast.promise
    }
  };

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <FaSpinner className="animate-spin text-6xl text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="bg-red-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-red-800 text-xl font-bold mb-2">Error Loading Dashboard</h2>
          <p className="text-red-600">{error.message}</p>
        </div>
      </div>
    );
  }

  const totalBookings = bookings.length || 0;
  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.total, 0) || 0;
  const activeBookings = bookings.filter(booking => new Date(booking.endDate) > new Date()).length || 0;
  const approvedBookings = bookings.filter(booking => booking.status === 'approved').length || 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen"
    >
      <div className="w-full mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Admin Dashboard
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Total Bookings', value: totalBookings, icon: FaUsers, color: 'from-blue-400 to-blue-600' },
            { title: 'Active Bookings', value: activeBookings, icon: FaCalendarCheck, color: 'from-green-400 to-green-600' },
            { title: 'Approved Bookings', value: approvedBookings, icon: FaCheckCircle, color: 'from-purple-400 to-purple-600' },
            { title: 'Total Revenue', value: `${totalRevenue.toFixed(2)}`, icon: FaMoneyBillWave, color: 'from-yellow-400 to-yellow-600' },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-r ${item.color} text-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
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
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-semibold mb-6">Recent Bookings</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-4 font-semibold text-gray-600">Name</th>
                  <th className="p-4 font-semibold text-gray-600">Email</th>
                  <th className="p-4 font-semibold text-gray-600">Start Date</th>
                  <th className="p-4 font-semibold text-gray-600">End Date</th>
                  <th className="p-4 font-semibold text-gray-600">Total</th>
                  <th className="p-4 font-semibold text-gray-600">Status</th>
                  <th className="p-4 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentBookings.map((booking, index) => (
                  <motion.tr
                    key={booking._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4">{booking.name}</td>
                    <td className="p-4">{booking.email}</td>
                    <td className="p-4">{new Date(booking.startDate).toLocaleDateString()}</td>
                    <td className="p-4">{new Date(booking.endDate).toLocaleDateString()}</td>
                    <td className="p-4 font-semibold text-green-600">£{booking.total.toFixed(2)}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        booking.status === 'approved' ? 'bg-green-100 text-green-800' :
                        booking.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1)}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
                        onClick={() => setSelectedBooking(booking)}
                      >
                        View Details
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-4">
            <React.Suspense fallback={<div>Loading...</div>}>
              <Pagination
                currentPage={currentPage}
                totalItems={bookings.length}
                itemsPerPage={bookingsPerPage}
                paginate={paginate}
              />
            </React.Suspense>
          </div>
        </motion.div>
        
        <Link href="/create-blog">
          <div className="mt-[3vw]">
            {/* <React.Suspense fallback={<div>Loading...</div>}>
              <CreateBlogButton />
            </React.Suspense> */}
          </div>
        </Link>
      </div>

      <AnimatePresence>
        {selectedBooking && (
          <React.Suspense fallback={<div>Loading...</div>}>
            <BookingModal
              booking={selectedBooking}
              rejectError={rejectError}
              rejectLoading={rejectLoading}
              processingBooking={processingBooking}
              onClose={() => setSelectedBooking(null)}
              handleApproval={handleApproval}
              handleReject={handleReject}
            />
          </React.Suspense>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Admin;
