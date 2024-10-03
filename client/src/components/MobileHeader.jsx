import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaChevronDown, FaChevronUp, FaHome, FaBoxOpen, FaInfoCircle, FaEnvelope, FaMobileAlt, FaTshirt, FaBook } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Mocked navigation data
const navData = [
  { title: 'Home', url: '/', icon: FaHome },
  { 
    title: 'Products', 
    url: '/products',
    icon: FaBoxOpen,
    submenu: [
      { title: 'Electronics', url: '/products/electronics', icon: FaMobileAlt },
      { title: 'Clothing', url: '/products/clothing', icon: FaTshirt },
      { title: 'Books', url: '/products/books', icon: FaBook },
    ]
  },
  { title: 'About', url: '/about', icon: FaInfoCircle },
  { title: 'Contact', url: '/contact', icon: FaEnvelope },
];

const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSubmenu = (index) => setActiveSubmenu(activeSubmenu === index ? null : index);

  return (
    <div className="relative z-10 lg:hidden">
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex justify-between items-center shadow-md">
      <motion.section whileHover={{scale:1.1}} className="mt-[-4vw] relative">
            <Link to="/" className="w-full block">
              <p className="font-genty text-[#f06eaa] text-[6vw] text-center">Fun</p>
              <p className="font-genty text-[#f06eaa] text-[6vw] absolute top-[5.5vw]">Rides</p>

            </Link>
          </motion.section>
        <button onClick={toggleMenu} className="focus:outline-none transition-transform duration-300 ease-in-out transform hover:scale-110">
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
                  <div 
                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 cursor-pointer transition-colors duration-300"
                    onClick={() => item.submenu ? toggleSubmenu(index) : null}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="text-blue-600" size={20} />
                      <span className="text-gray-800 font-medium">{item.title}</span>
                    </div>
                    {item.submenu && (
                      activeSubmenu === index ? <FaChevronUp className="text-gray-600" size={16} /> : <FaChevronDown className="text-gray-600" size={16} />
                    )}
                  </div>
                  <AnimatePresence>
                    {item.submenu && activeSubmenu === index && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gray-50"
                      >
                        {item.submenu.map((subItem, subIndex) => (
                          <li key={subIndex} className="px-8 py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-300">
                            <div className="flex items-center space-x-3">
                              <subItem.icon className="text-purple-600" size={16} />
                              <span className="text-gray-600">{subItem.title}</span>
                            </div>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
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