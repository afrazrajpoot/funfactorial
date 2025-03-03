'use client';
import React, { useState, useEffect } from 'react';
import { Package, LayoutDashboard, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname(); // Get the current URL path
  
  const menuItems = [
    { icon: <Package size={20} />, label: 'All Blogs', href: '/dashboard' },
    { icon: <LayoutDashboard size={20} />, label: 'Add Blog', href: '/create-blog' },
    { icon: <ShoppingCart size={20} />, label: 'Add Product Info', href: '/add-product-info' },
  ];
  
  // Animation variants for the sidebar
  const sidebarVariants = {
    expanded: { width: '16rem' }, // 256px = w-64
    collapsed: { width: '4rem' },  // 64px = w-16
  };
  
  // Animation variants for menu item text
  const textVariants = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -20 },
  };
  
  return (
    <div className="flex h-screen relative w-full">
      {/* Sidebar */}
      <motion.div
        style={{ backgroundColor: '#1a202c' }} // gray-900
        initial={isCollapsed ? 'collapsed' : 'expanded'}
        animate={isCollapsed ? 'collapsed' : 'expanded'}
        variants={sidebarVariants}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="text-white h-full fixed shadow-lg z-10"
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full p-4 flex justify-end hover:bg-gray-800"
        >
          <motion.div
            animate={{ rotate: isCollapsed ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </motion.div>
        </button>
        
        {/* Navigation Items */}
        <nav className="mt-4">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href; // Check if this item is active
            
            return (
              <Link key={index} href={item.href}>
                <motion.div
                  className={`flex items-center p-4 transition-colors cursor-pointer relative ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'hover:bg-gray-800'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-white"></span>
                  )}
                  <span className={`flex-shrink-0 ${isActive ? 'text-white' : ''}`}>{item.icon}</span>
                  {!isCollapsed && (
                    <motion.span
                      className="ml-4"
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      transition={{ duration: 0.2 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </motion.div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <main className="">{children}</main>
      </div>
    </div>
  );
};

export default Layout;