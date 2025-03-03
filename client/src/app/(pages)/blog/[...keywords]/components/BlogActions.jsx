'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import CryptoJS from 'crypto-js';

export function BlogActions({ blogId, keywords }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [admin, setAdmin] = useState(false);

  // Define admin credentials (these should ideally come from a secure source)
  const adminEmail = 'subadmin@gmail.com'; // Replace with your actual admin email
  const adminPassword = 'Subadmin@123+';  // Replace with your actual admin password
  const encryptionKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY; // Ensure this is correctly set in .env
  console.log(encryptionKey,'encryption key')
  const deleteBlog = async () => {
    setLoading(true);
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/deleteBlog/${blogId}`);
      toast.success('Blog deleted successfully', { position: 'top-center' });
      setIsPopupOpen(false); // Close popup on success
      router.push('/dashboard');
    } catch (err) {
      console.error('Error deleting blog:', err);
      toast.error('Failed to delete blog', { position: 'top-center' });
    } finally {
      setLoading(false);
    }
  };
console.log(admin,'admin')
  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      const storedEmail = localStorage.getItem('subadminEmail');
      const storedPassword = localStorage.getItem('subadminPassword');

      // Ensure encryptionKey is defined
      if (!encryptionKey) {
        console.error('Encryption key is not defined');
        return;
      }

      if (storedEmail && storedPassword) {
        try {
          const decryptedEmail = CryptoJS.AES.decrypt(storedEmail, encryptionKey).toString(CryptoJS.enc.Utf8);
          const decryptedPassword = CryptoJS.AES.decrypt(storedPassword, encryptionKey).toString(CryptoJS.enc.Utf8);

          if (decryptedEmail === adminEmail && decryptedPassword === adminPassword) {
            setAdmin(true);
          } else {
            setAdmin(false);
          }
        } catch (error) {
          console.error('Decryption failed:', error);
          setAdmin(false);
        }
      } else {
        setAdmin(false);
      }
    }
  }, [encryptionKey]); // Add encryptionKey as a dependency if it might change

  // Optionally restrict visibility to admin only
  if (!admin) return null;

  return (
    <div className="bg-white p-[3vw] md:p-[1vw] relative">
      {/* Update Blog Button */}
      <button
        className="ml-[3vw] hover:shadow-lg bg-[#152347] text-white text-[3vw] md:text-[1vw] rounded-md shadow-md p-[0.5vw] transition-all duration-300"
        onClick={() => router.push(`/update-blog/${keywords}`)}
      >
        Update Blog
      </button>

      {/* Delete Blog Button */}
      <button
        className="ml-[3vw] hover:shadow-lg bg-amber-500 text-white text-[3vw] md:text-[1vw] rounded-md shadow-md p-[0.5vw] transition-all duration-300"
        onClick={() => setIsPopupOpen(true)}
        disabled={loading}
      >
        {loading ? 'Deleting...' : 'Delete Blog'}
      </button>

      {/* Confirmation Popup */}
      <AnimatePresence>
        {isPopupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg p-6 w-[90vw] md:w-[30vw] shadow-xl"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Confirm Deletion
              </h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this blog? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  className="bg-gray-300 text-gray-800 text-[3vw] md:text-[1vw] rounded-md px-4 py-2 hover:bg-gray-400 transition-all duration-300"
                  onClick={() => setIsPopupOpen(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-500 text-white text-[3vw] md:text-[1vw] rounded-md px-4 py-2 hover:bg-red-600 transition-all duration-300"
                  onClick={deleteBlog}
                  disabled={loading}
                >
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}