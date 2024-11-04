import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
// import Layout from "../../Layout/Layout";
import { Toaster, toast } from "sonner";

import CryptoJS from 'crypto-js';
// import SocialShare from '../../Component/SocialShare'
import { Helmet } from "react-helmet";
import SocialShare from "../components/SocialShare";
import Layout from "../components/Layout";
import { useGlobalState } from "../context/globalState";

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
      if (res) {
        setBlogData(res.data);
        setBlogId(res.data._id);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      // Handle error
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
      // Handle error
    }
  };



  const setOpenGraphTags = (data) => {
    const metaTitle = data.metaTitle || "Blog Title";
    const metaDescription = data.metaDescription || "Blog Description";
    const metaImage = `${import.meta.env.VITE_API_URL}/blogsPosts/${data.image1?.fileName}` || "Default Image URL";

    document.title = metaTitle;
    document.querySelector('meta[name="description"]').setAttribute("content", metaDescription);
    
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", metaTitle);
    else {
      const meta = document.createElement('meta');
      meta.setAttribute("property", "og:title");
      meta.setAttribute("content", metaTitle);
      document.head.appendChild(meta);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute("content", metaDescription);
    else {
      const meta = document.createElement('meta');
      meta.setAttribute("property", "og:description");
      meta.setAttribute("content", metaDescription);
      document.head.appendChild(meta);
    }

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) ogImage.setAttribute("content", metaImage);
    else {
      const meta = document.createElement('meta');
      meta.setAttribute("property", "og:image");
      meta.setAttribute("content", metaImage);
      document.head.appendChild(meta);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", window.location.href);
    else {
      const meta = document.createElement('meta');
      meta.setAttribute("property", "og:url");
      meta.setAttribute("content", window.location.href);
      document.head.appendChild(meta);
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

  const metaTitle = blogData.metaTitle || "Blog Title";
  const metaDescription = blogData.metaDescription || "Blog Description";
  const metaImage = `${import.meta.env.VITE_API_URL}/blogsPosts/${blogData.image1?.fileName}` || "Default Image URL";


  return (
    <Layout>
      <Helmet>
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={metaImage} />
        <meta property="og:site_name" content="Danhamz" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Danhamz" />
        <meta name="twitter:creator" content="@Danhamz" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaImage} />
      </Helmet>
      <Toaster />
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-2xl font-bold">Loading...</p>
        </div>
      ) : (
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
            All you want to know about us
          </h1>
          <div className="flex flex-col justify-center items-center my-8">
            <SocialShare
              fbURL={window.location.href}
              twURL={window.location.href}
              waURL={window.location.href}
              title={blogData.metaTitle}
              image={`${import.meta.env.VITE_API_URL}/${blogData.image1?.fileName}`}
            />
            <p className="text-sm md:text-base lg:text-lg ml-4">Click here to share this article</p>
          </div>
          {[...Array(15)].map((_, index) => (
            <div className="my-8" key={index}>
              {blogData?.[`image${index + 1}`] && (
                <figure className="w-full max-w-[80vw] md:max-w-[50vw] lg:max-w-[40vw] mx-auto rounded-md mb-4">
                  <img
                    src={`${import.meta.env.VITE_API_URL}/${blogData?.[`image${index + 1}`]?.fileName}`}
                    alt="blog_image"
                    className="w-full rounded-md"
                  />
                </figure>
              )}
              {blogData?.[`heading${index + 1}`] && (
                <h2 className="text-[#152347] font-semibold text-start w-full max-w-[70vw] md:max-w-[50vw] lg:max-w-[40vw] mx-auto text-2xl md:text-3xl lg:text-4xl mb-4">
                  {blogData?.[`heading${index + 1}`]}
                </h2>
              )}
              {blogData?.[`info${index + 1}`] && (
                <div className="text-[#152347] mt-4 w-full max-w-[70vw] md:max-w-[50vw] lg:max-w-[40vw] mx-auto text-base md:text-lg lg:text-xl">
                  {blogData?.[`info${index + 1}`]?.split('\n')?.map((paragraph, index) => (
                    <React.Fragment key={index}>
                      <p>{paragraph}</p>
                      {index !== blogData[`info${index + 1}`]?.split('\n')?.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          ))}
          <p className="text-[#152347] mt-8 font-medium w-full max-w-[80vw] md:max-w-[50vw] lg:max-w-[40vw] mx-auto text-base md:text-lg lg:text-xl">
            By: {blogData?.name}
          </p>
        </div>
      )}
    </Layout>
  );
};

export default ReadSingleBlog;


