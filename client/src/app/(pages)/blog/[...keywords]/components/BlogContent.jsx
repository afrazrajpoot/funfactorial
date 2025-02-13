import React from "react";
import axios from "axios";
import Layout from "@/Layout/Layout";
import Header from "@/components/Header";
import BlogContentClient from "./BlogContentClient";

// Fetch blog data
const getBlogData = async (slug) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/blogs/${slug}`
    );
    console.log("API Response:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error fetching blog:", err);
    return {};
  }
};

// Generate metadata dynamically
export async function generateMetadata({ params }) {
  const keywords = params.keywords[0];
  const blogData = await getBlogData(keywords);

  return {
    title: blogData?.metaTitle ?? blogData?.title ?? "Default Blog Title",
    description: blogData?.metaDescription ?? "Default Blog Description",
    openGraph: {
      title: blogData?.metaTitle ?? blogData?.title ?? "Default Blog Title",
      description: blogData?.metaDescription ?? "Default Blog Description",
      url: `https://api.funrides.co.uk/blogs/${keywords}`,
      siteName: "Danhamz",
      type: "article",
      images: [
        {
          url: blogData?.image1?.fileName
            ? `${process.env.NEXT_PUBLIC_API_URL}/${blogData.image1.fileName}`
            : `${process.env.NEXT_PUBLIC_API_URL}/default-image.jpg`,
          width: 1200,
          height: 630,
          alt: blogData?.metaTitle ?? "Blog Image",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@Funfactorial",
      creator: "@Funfactorial",
      title: blogData?.metaTitle ?? blogData?.title ?? "Default Blog Title",
      description: blogData?.metaDescription ?? "Default Blog Description",
      images: [
        blogData?.image1?.fileName
          ? `${process.env.NEXT_PUBLIC_API_URL}/${blogData.image1.fileName}`
          : `${process.env.NEXT_PUBLIC_API_URL}/default-image.jpg`,
      ],
    },
  };
}

const BlogContent = async ({ params }) => {
  const keywords = params.keywords[0];
  const blogData = await getBlogData(keywords);

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
