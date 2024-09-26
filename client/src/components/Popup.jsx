import React from 'react';
import { motion } from 'framer-motion';
import { FaExclamationTriangle } from 'react-icons/fa';

const Popup = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="w-full absolute top-0 z-50 bg-red-600 text-white p-4 shadow-lg"
    >
      <div className="container mx-auto flex items-center justify-center space-x-4">
        <FaExclamationTriangle className="text-2xl" />
        <p className="text-lg font-semibold">
          This site is under development. For immediate bookings, please call us.
        </p>
      </div>
    </motion.div>
  );
};

export default Popup;