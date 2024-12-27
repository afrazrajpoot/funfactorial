import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import CryptoJS from 'crypto-js';
import { Helmet } from "react-helmet";
import SocialShare from "../components/SocialShare";
import Layout from "../components/Layout";
import { useGlobalState } from "../context/globalState";
import Header from "../components/Header";

const ReadSingleBlog = () => {
  const { keywords } = useParams();
  const [blogId, setBlogId] = useState(null);
  const [blogData, setBlogData] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { newBlog } = useGlobalState();
  const encryptionKey = import.meta.env.VITE_SECRET_KEY;
  const adminEmail = 'subadmin@gmail.com';
  const adminPassword = 'Subadmin@123+';
  const [admin, setAdmin] = useState(false);

  const readBlog = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/blogs/${keywords}`
      );
      if (res?.data) {
        setBlogData(res.data);
        setBlogId(res.data._id);
      } else {
        setBlogData({});
      }
    } catch (err) {
      setBlogData({});
      console.error("Error fetching blog:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/v1/deleteBlog/${blogId}`
      );
      if (res) {
        toast.success("Delete successfully", {
          position: "top-center",
        });
        navigate("/blogs");
      }
    } catch (err) {
      toast.error("Failed to delete blog");
      console.error("Error deleting blog:", err);
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
    readBlog();
  }, [newBlog]);

  // Handle meta tags with fallbacks
  const metaTitle = blogData?.metaTitle ?? "";
  const metaDescription = blogData?.metaDescription ?? "";
  const metaImage = blogData?.image1?.fileName 
    ? `${import.meta.env.VITE_API_URL}/blogsPosts/${blogData.image1.fileName}`
    : "";

  // If no data is found, show a message
  if (!loading && Object.keys(blogData).length === 0) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-2xl font-bold">No blog post found</p>
        </div>
      </Layout>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-2xl font-bold">Loading...</p>
        </div>
      </Layout>
    );
  }

  // Function to safely check if a section has content
  const hasSectionContent = (index) => {
    return (
      (blogData[`image${index}`]?.fileName ?? "") !== "" ||
      (blogData[`heading${index}`] ?? "") !== "" ||
      (blogData[`info${index}`] ?? "") !== ""
    );
  };

  // Function to safely get image URL
  const getImageUrl = (index) => {
    const fileName = blogData[`image${index}`]?.fileName;
    return fileName ? `${import.meta.env.VITE_API_URL}/${fileName}` : "";
  };

  return (
    <>
    <Header />
      <Helmet>
        {metaTitle && <meta property="og:title" content={metaTitle} />}
        {metaDescription && <meta property="og:description" content={metaDescription} />}
        {metaImage && <meta property="og:image" content={metaImage} />}
        <meta property="og:site_name" content="Danhamz" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Danhamz" />
        <meta name="twitter:creator" content="@Danhamz" />
        {metaTitle && <meta name="twitter:title" content={metaTitle} />}
        {metaDescription && <meta name="twitter:description" content={metaDescription} />}
        {metaImage && <meta name="twitter:image" content={metaImage} />}
      </Helmet>
      <Toaster />
      <div className="bg-white p-8 md:p-12 lg:p-16">
        {admin && (
          <div className="flex justify-end mb-4">
            <button
              className="bg-[#152347] text-white px-4 py-2 rounded-md hover:shadow-lg mr-2"
              onClick={() => navigate(`/update-blog/${keywords}`)}
            >
              Update Blog
            </button>
            <button
              className="bg-amber-500 text-white px-4 py-2 rounded-md hover:shadow-lg"
              onClick={deleteBlog}
            >
              Delete Blog
            </button>
          </div>
        )}
        
        <h1 className="text-[#152347] text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 text-center">
          {blogData?.title ?? ""}
        </h1>

        {(metaTitle ?? "") !== "" && (
          <div className="flex flex-col justify-center items-center my-8">
            <SocialShare
              fbURL={window.location.href}
              twURL={window.location.href}
              waURL={window.location.href}
              title={metaTitle}
              image={metaImage}
            />
            <p className="text-sm md:text-base lg:text-lg ml-4">Click here to share this article</p>
          </div>
        )}

        {[...Array(15)].map((_, index) => {
          const sectionIndex = index + 1;
          if (!hasSectionContent(sectionIndex)) return null;

          const imageUrl = getImageUrl(sectionIndex);
          const heading = blogData[`heading${sectionIndex}`] ?? "";
          const info = blogData[`info${sectionIndex}`] ?? "";

          return (
            <div className="my-8" key={index}>
              {imageUrl ? (
                <figure className="w-full max-w-[80vw] md:max-w-[50vw] lg:max-w-[40vw] mx-auto rounded-md mb-4">
                  <img
                    src={imageUrl}
                    alt={heading || `Blog image ${sectionIndex}`}
                    className="w-full rounded-md"
                  />
                </figure>
              ):''}
              
              {heading ? (
                <h2 className="text-[#152347] font-semibold text-start w-full max-w-[70vw] md:max-w-[50vw] lg:max-w-[40vw] mx-auto text-2xl md:text-3xl lg:text-4xl mb-4">
                  {heading === 'undefined' ?'':heading}
                </h2>
              ):''}
              
              {info ? (
                <div className="text-[#152347] mt-4 w-full max-w-[70vw] md:max-w-[50vw] lg:max-w-[40vw] mx-auto text-base md:text-lg lg:text-xl">
                  {info.split('\n')
                    .filter(Boolean)
                    .map((paragraph, pIndex, arr) => (
                      <React.Fragment key={pIndex}>
                        <p>{paragraph ==='undefined' ?'':paragraph}</p>
                        {pIndex !== arr.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                </div>
              ):''}
            </div>
          );
        })}

        <p className="text-[#152347] mt-8 font-medium w-full max-w-[80vw] md:max-w-[50vw] lg:max-w-[40vw] mx-auto text-base md:text-lg lg:text-xl">
          {blogData?.name ? `By: ${blogData.name}` : ""}
        </p>
      </div>
    </>
  );
};

export default ReadSingleBlog;