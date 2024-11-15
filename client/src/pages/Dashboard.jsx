import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CryptoJS from 'crypto-js';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Layout from '../Layout/Layout';

// import Pagination from '../components/Pagination';

const Dashboard = () => {
  const encryptionKey = import.meta.env.VITE_SECRET_KEY;
  const adminEmail = 'subadmin@gmail.com';
  const adminPassword = 'Subadmin@123+';
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
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
  }, [navigate]);


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen"
    >
        <Layout>
            
        </Layout>
    </motion.div>
  );
};


export default Dashboard