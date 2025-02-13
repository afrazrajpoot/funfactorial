// BlogContent.server.js
import React from 'react';
import axios from 'axios';
import Head from 'next/head';
import dynamic from 'next/dynamic';
// import Layout from '@/Layout/Layout';
import Header from '@/components/Header';
import Layout from '@/Layout/Layout';
import BlogContentClient from './BlogContentClient';

// Dynamically import client components
// const SocialShare = dynamic(() => import('@/components/SocialShare'), { ssr: false });
// const BlogContentClient = dynamic(() => import('@/components/BlogContentClient'), { ssr: false });

const BlogContent = async ({ params }) => {
  const keywords =  params.keywords[0];
  console.log("Fetching blog with slug:", keywords);

  const encryptionKey = process.env.NEXT_PUBLIC_SECRET_KEY;
  const adminEmail = 'subadmin@gmail.com';
  const adminPassword = 'Subadmin@123+';

  // Fetch blog data
  const readBlog = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/blogs/${keywords}`
      );
      console.log(res,'ress')
      return res.data;
   
    } catch (err) {
      console.error("Error fetching blog:", err);
      return {};
    }
  };
  

  const blogData = await readBlog();

  // Handle meta tags with fallbacks
  const metaTitle = blogData?.metaTitle ?? blogData?.title ?? "Default Blog Title";
  const metaDescription = blogData?.metaDescription ?? "Default Blog Description";
  const metaImage = blogData?.image1?.fileName 
    ? `${process.env.NEXT_PUBLIC_API_URL}/${blogData.image1.fileName}`
    : `${process.env.NEXT_PUBLIC_API_URL}/default-image.jpg`; // Fallback image if no blog image

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
console.log(metaImage,'meta image')
  return (
    <>
      <Header />
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={metaImage} />
        <meta property="og:site_name" content="Danhamz" />
        <meta property="og:url" content={`https://api.funrides.co.uk/blogs/${keywords}`} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Danhamz" />
        <meta name="twitter:creator" content="@Danhamz" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaImage} />
      </Head>
      <BlogContentClient blogData={blogData} metaTitle={metaTitle} metaImage={metaImage} />
    </>
  );
};

export default BlogContent;