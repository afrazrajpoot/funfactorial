import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from '../components/Layout';
import BlogCard from '../components/BlogCard';
import { useGlobalState } from "../context/globalState";
import CryptoJS from 'crypto-js';
import Header from "../components/Header";

const Blogs = () => {
  const [blogsPosts, setBlogsPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { newBlog } = useGlobalState();
  const encryptionKey = import.meta.env.VITE_SECRET_KEY;
  const adminEmail = 'subadmin@gmail.com';
  const adminPassword = 'Subadmin@123+';
  const [admin, setAdmin] = useState(false);

  const getBlogData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/readBlogs`);
      setBlogsPosts(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to load blogs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem('subadminEmail');
    const storedPassword = localStorage.getItem('subadminPassword');
    if (storedEmail && storedPassword) {
      const decryptedEmail = CryptoJS.AES.decrypt(storedEmail, encryptionKey).toString(CryptoJS.enc.Utf8);
      const decryptedPassword = CryptoJS.AES.decrypt(storedPassword, encryptionKey).toString(CryptoJS.enc.Utf8);
      if (decryptedEmail === adminEmail && decryptedPassword === adminPassword) {
        setAdmin(true);
      }
    } 
  }, []);

  useEffect(() => {
    getBlogData();
  }, [newBlog]);
  return (
    <>
    <Header />
      <main className="bg-white min-h-screen py-8 px-4">
        {/* Page Header */}
        <div className="text-center mb-8 relative">
          <h1 className="
            text-3xl 
            md:text-4xl 
            font-bold 
            text-amber-500 
            mb-4 
            tracking-wider
          ">
            Blogs
          </h1>
        {admin &&  <Link to="/create-blog" className="text-white absolute right-[3vw] bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
            Create  Blog
          </Link>}
          <p className="
            text-xl 
            md:text-lg 
            text-gray-600 
            max-w-2xl 
            mx-auto
          ">
            All you want to know about our rides and funfare
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="
              animate-spin 
              rounded-full 
              h-16 
              w-16 
              border-t-4 
              border-indigo-500
            "></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="
            bg-red-100 
            border 
            border-red-400 
            text-red-700 
            px-4 
            py-3 
            rounded 
            relative 
            text-center
          " role="alert">
            {error}
          </div>
        )}

        {/* Blog Posts Grid */}
        {!loading && !error && (
          <div className={`
            grid 
            grid-cols-1 
            md:grid-cols-2 
            xl:grid-cols-3 
            gap-6 
            ${blogsPosts.length === 0 ? 'justify-center' : ''}
          `}>
            {blogsPosts.length === 0 ? (
              <p className="
                text-gray-500 
                text-xl 
                text-center 
                col-span-full
              ">
                No blogs available
              </p>
            ) : (
              blogsPosts.map((item, index) => (
                <div 
                  key={item._id || index} 
                  className="
               
                  "
                >
                  <BlogCard 
                    keywords={item.keywords} 
                    info={item?.info1} 
                    img={`${import.meta.env.VITE_API_URL}/${item?.image1?.fileName}`} 
                    {...item} 
                  />
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </>
  );
};

export default Blogs;
