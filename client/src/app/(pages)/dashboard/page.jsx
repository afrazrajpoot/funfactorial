'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from '@/components/BlogCard';
import Layout from '@/Layout/Layout';
import { useGlobalState } from '@/context/globalState';

const BlogPosts = () => {
  const [blogsPosts, setBlogsPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { newBlog } = useGlobalState();

  const getBlogData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/readBlogs`);
      setBlogsPosts(res.data);
      setError(null);
    } catch (err) {
      setError("No blog post available. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogData();
  }, [newBlog]);

  return (
    <Layout>
      <main className="bg-white min-h-screen py-8 px-[8.5vw] w-full ml-[7.5vw] ">
        {/* Page Header */}
        <div className="text-center mb-8 relative">
          <h1 className="text-3xl md:text-4xl font-bold text-amber-500 mb-4 tracking-wider">
            Blogs
          </h1>
          <p className="text-xl md:text-lg text-gray-600 max-w-2xl mx-auto">
            All you want to know about our landlords and tenants
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center" role="alert">
            {error}
          </div>
        )}

        {/* Blog Posts Grid */}
        {!loading && !error && (
          <div className={`grid grid-cols-1 md:grid-cols-4 xl:grid-cols-4 gap-6 ${blogsPosts.length === 0 ? 'justify-center' : ''}`}>
            {blogsPosts.length === 0 ? (
              <p className="text-gray-500 text-xl text-center col-span-full">
                No blogs available
              </p>
            ) : (
              blogsPosts.map((item, index) => (
                <div key={item._id || index} className="">
                  <BlogCard 
                    keywords={item._id} 
                    info={item?.info1} 
                    img={`${process.env.NEXT_PUBLIC_API_URL}/${item?.image1?.fileName}`} 
                    {...item} 
                  />
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </Layout>
  );
};

export default BlogPosts;