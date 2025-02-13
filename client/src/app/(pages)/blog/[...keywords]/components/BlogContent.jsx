// BlogContent.server.js
import React from 'react';
import axios from 'axios';
import Layout from '@/Layout/Layout';
import Header from '@/components/Header';
import BlogContentClient from './BlogContentClient';
import SocialShare from './SocialShare';

// Function to fetch blog data
const readBlog = async (keywords) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/blogs/${keywords}`
    );
  
    return res.data;

  } catch (err) {
    console.error("Error fetching blog:", err);
    return {};
  }
};

// Generate metadata dynamically
export async function generateMetadata({ params }) {
  const keywords = params.keywords[0];
  const blogData = await readBlog(keywords);

  const metaTitle = blogData?.metaTitle ?? blogData?.title ?? "Default Blog Title";
  const metaDescription = blogData?.metaDescription ?? "Default Blog Description";
  const metaImage = blogData?.image1?.fileName
    ? `${process.env.NEXT_PUBLIC_API_URL}/${blogData.image1.fileName}`
    : `${process.env.NEXT_PUBLIC_API_URL}/default-image.jpg`;

  return {  
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: [
        {
          url: metaImage,
          width: 800,
          height: 600,
          alt: metaTitle,
        },
      ],
     icons:{
      icon: "/images/icon.jpg",
      },
    
      siteName: "Danhamz",
      url: `https://api.funrides.co.uk/blogs/${keywords}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      site: "@Funfactorial",
      creator: "@Funfactorial",
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
    },
  };
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