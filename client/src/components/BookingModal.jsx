export const BookingModal = ({ booking, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className="bg-white rounded-lg p-6 max-w-2xl w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Booking Details</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-semibold text-gray-800">{booking.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold text-gray-800">{booking.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-semibold text-gray-800">{booking.phone}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Start Date</p>
              <p className="font-semibold text-gray-800">
                {new Date(booking.startDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">End Date</p>
              <p className="font-semibold text-gray-800">
                {new Date(booking.endDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="font-semibold text-green-600">${booking.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-gray-700 mb-3">Status</h3>
          <div className="flex gap-4">
            <button
              onClick={() => handleApproval(booking, 'approved')}
              disabled={processingBooking === booking._id}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                booking.status === 'approved'
                  ? 'bg-green-500 text-white'
                  : processingBooking === booking._id
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-gray-200 hover:bg-green-500 hover:text-white'
              }`}
            >
              {processingBooking === booking._id ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <FaCheckCircle />
              )}
              Approve
            </button>
            <button
              onClick={() => handleReject(booking)}
              disabled={processingBooking === booking._id}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                booking.status === 'rejected'
                  ? 'bg-red-500 text-white'
                  : processingBooking === booking._id
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-gray-200 hover:bg-red-500 hover:text-white'
              }`}
            >
              <FaTimesCircle />
              {rejectLoading ?'processing...':'Reject'}
            </button>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 mb-3">Item Details</h3>
          <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
            {JSON.stringify(booking.itemDetail, null, 2)}
          </pre>
        </div>
      </motion.div>
    </motion.div>
  );