'use client'; // If using Next.js 13 with app directory

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CryptoJS from 'crypto-js';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import Layout with ssr: false to ensure client-side rendering
const Layout = dynamic(() => import('@/Layout/Layout'), { ssr: false });

const Dashboard = () => {
  const encryptionKey = process.env.NEXT_PUBLIC_SECRET_KEY;
  const adminEmail = 'subadmin@gmail.com';
  const adminPassword = 'Subadmin@123+';
  const [admin, setAdmin] = useState(false);
  const { push: navigate } = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedEmail = localStorage.getItem('subadminEmail');
      const storedPassword = localStorage.getItem('subadminPassword');

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen"
    >
      <Layout>
        {/* Add content here if needed */}
      </Layout>
    </motion.div>
  );
};

export default Dashboard;
