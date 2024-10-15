import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { navData } from '../data'; // Ensure navData is structured correctly

const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative z-10 lg:hidden">
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex justify-between items-center shadow-md">
        <Link to="/" className="block">
          <p className="font-genty text-[#f06eaa] text-[6vw] text-center">Fun</p>
          <p className="font-genty text-[#f06eaa] text-[6vw] absolute top-[5.5vw]">Rides</p>
        </Link>
        <button 
          onClick={toggleMenu} 
          className="focus:outline-none transition-transform duration-300 ease-in-out transform hover:scale-110" 
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg overflow-hidden"
          >
            <ul className="py-2">
              {navData.map((item, index) => (
                <li key={index} className="border-b border-gray-200 last:border-b-0">
                  <Link
                    to={item.url}
                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 transition-colors duration-300"
                  >
                    <div className="flex items-center space-x-3">
                      {item.icon && <item.icon className="text-blue-600" size={20} />}
                      <span className="text-gray-800 font-medium">{item.title}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileHeader;
