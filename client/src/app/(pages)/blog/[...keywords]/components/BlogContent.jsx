// BlogContent.server.js
import React from 'react';
import axios from 'axios';
import Layout from '@/Layout/Layout';
import Header from '@/components/Header';
import BlogContentClient from './BlogContentClient';
import SocialShare from './SocialShare';



async function readBlog(slug) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/blogs/${slug}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error('Failed to fetch blog data');
    return res.json();
  } catch (err) {
    console.error("Error fetching blog:", err);
    return {};
  }
}

const BlogContent = async ({ params }) => {
  const keywords = params.keywords[0];
  const blogData = await readBlog(keywords);

  // If no data is found, show a message
  if (Object.keys(blogData).length === 0) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-2xl font-bold">No blog post found</p>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Header />
   
      <BlogContentClient blogData={blogData} />
    </>
  );
};

export default BlogContent;