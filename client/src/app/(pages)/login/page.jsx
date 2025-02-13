'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';
import CryptoJS from 'crypto-js'; // Import CryptoJS
import { useRouter } from 'next/navigation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {push: navigate} = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (typeof window !== 'undefined') {
      // Check admin credentials
      if (email === 'admin@gmail.com' && password === 'admin') {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        
        // Encrypt the email and password
        const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;
        const encryptedEmail = CryptoJS.AES.encrypt(email, SECRET_KEY).toString();
        const encryptedPassword = CryptoJS.AES.encrypt(password, SECRET_KEY).toString();

        // Save encrypted credentials in localStorage
        localStorage.setItem('adminEmail', encryptedEmail);
        localStorage.setItem('adminPassword', encryptedPassword);

        toast.success('Login successful!');
        navigate('/admin');
      } else if (email === 'subadmin@gmail.com' && password === 'Subadmin@123+') {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
            
            // Encrypt the email and password
            const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;
            const encryptedEmail = CryptoJS.AES.encrypt(email, SECRET_KEY).toString();
            const encryptedPassword = CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
    
            // Save encrypted credentials in localStorage
            localStorage.setItem('subadminEmail', encryptedEmail);
            localStorage.setItem('subadminPassword', encryptedPassword);
    
            toast.success('Login successful!');
            navigate('/blogs');
    
      } else {
        toast.error('Invalid admin credentials');
      }
    }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-lg w-full max-w-md rounded-2xl shadow-2xl p-8 border border-white/20"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-4"
          >
            <ShieldAlert className="h-16 w-16 text-purple-400" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-white mb-2"
          >
            Admin Portal
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-300"
          >
            Secure access for administrators only
          </motion.p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Admin Email"
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-400"
                required
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin Password"
                className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-between text-sm"
          >
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 mr-2"
              />
              <span className="text-gray-300">Remember device</span>
            </label>
            <button
              type="button"
              onClick={() => toast.info('Contact system administrator for password reset')}
              className="text-purple-400 hover:text-purple-300 font-medium"
            >
              Forgot Password?
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-violet-500 text-white font-medium py-3 px-4 rounded-lg hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="inline-flex items-center">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="border-2 border-white border-t-transparent rounded-full w-5 h-5 inline-block mr-2"
                  />
                  Authenticating...
                </span>
              ) : (
                'Access Admin Panel'
              )}
            </button>
          </motion.div>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center text-gray-400 text-sm"
        >
          <p>
            Protected by enhanced security protocols.
            <br />
            Unauthorized access attempts will be logged.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
