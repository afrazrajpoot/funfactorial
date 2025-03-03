'use client'
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { useRouter, useParams } from "next/navigation";
import { Icon } from "@iconify/react";
import { Trash2 } from 'lucide-react';
// import { blogsForm } from "../data";
// import { useGlobalState } from "../context/globalState";
import CryptoJS from 'crypto-js';
import { blogsForm } from "@/app/data";
import { useGlobalState } from "@/context/globalState";
import Layout from "@/Layout/Layout";
// import Layout from "../Layout/Layout";

const BlogForm = () => {
  const router = useRouter();
  const params = useParams();
  const blogKeyword = params?.keywords;
  const { setNewBlog } = useGlobalState();
  const [blogId, setBlogId] = useState(null);
  const [authAdmin, setAuthAdmin] = useState(null);
  const [blogPostData, setBlogsPostData] = useState({
    metaTitle: "", metaDescription: "", keywords: "", name: "",
    info1: "", info2: "", info3: "", info4: "", info5: "",
    info6: "", info7: "", info8: "", info9: "", info10: "",
    heading1: "", heading2: "", heading3: "", heading4: "", heading5: "",
    heading6: "", heading7: "", heading8: "", heading9: "", heading10: ""
  });
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const { formState: { errors }, control, handleSubmit, setValue, reset } = useForm({
    defaultValues: blogPostData,
  });

  const getBlogPost = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/blogs/${blogKeyword}`);
      setBlogsPostData(res.data);
      setBlogId(res?.data?._id);
      reset(res.data);

      const fetchedImageURLs = [];
      for (let i = 1; i <= 10; i++) {
        const image = res.data[`image${i}`];
        if (image && image.fileName) {
          fetchedImageURLs.push(`${process.env.NEXT_PUBLIC_API_URL}/${image.fileName}`);
        }
      }
      setImageURLs(fetchedImageURLs);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleFilesChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    const imageURLsArray = selectedFiles.map(file => URL.createObjectURL(file));
    setImageURLs(prev => [...prev, ...imageURLsArray]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogsPostData({ ...blogPostData, [name]: value });
    setValue(name, value);
  };

  const handleImageDelete = async (index) => {
    try {
      setLoading(true);
      const fileName = imageURLs[index].split('/').pop();
      if (!fileName) {
        throw new Error("File name is undefined");
      }

      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/deleteImages/${blogKeyword}`, {
        data: { fileName: fileName }
      });
  
      setImageURLs(prev => prev.filter((_, i) => i !== index));
      setLoading(false);
      toast.success("Image deleted successfully");
    } catch (err) {
      setLoading(false);
      toast.error("Failed to delete image");
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    files.forEach((file, index) => formData.append(`image${index + 1}`, file));

    try {
      setLoading(true);
      const res = await axios({
        method: blogKeyword ? 'put' : 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/${blogKeyword ? `updateBlog/${blogId}` : 'createBlog'}`,
        data: formData
      });
      setLoading(false);
      setNewBlog(res.data);
      toast.success(blogKeyword ? "Blog updated successfully" : "Blog created successfully");
      router.push("/blogs");
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  const encryptionKey = process.env.NEXT_PUBLIC_SECRET_KEY;
  const adminEmail = 'subadmin@gmail.com';
  const adminPassword = 'Subadmin@123+';

  useEffect(() => {
    const storedEmail = localStorage.getItem('subadminEmail');
    const storedPassword = localStorage.getItem('subadminPassword');

    if (storedEmail && storedPassword) {
      const decryptedEmail = CryptoJS.AES.decrypt(storedEmail, encryptionKey).toString(CryptoJS.enc.Utf8);
      const decryptedPassword = CryptoJS.AES.decrypt(storedPassword, encryptionKey).toString(CryptoJS.enc.Utf8);
      setAuthAdmin({
        email: decryptedEmail,
        password: decryptedPassword
      });
      if (decryptedEmail !== adminEmail || decryptedPassword !== adminPassword) {
        router.push('/');
      }
    } else {
      router.push('/');
    }
  }, [router]);

  useEffect(() => {
    if (blogKeyword) getBlogPost();
  }, [blogKeyword]);

  return (
    <Layout>
  
        <form onSubmit={handleSubmit(onSubmit)} className='w-full ml-[28vw]   bg-white rounded-lg p-8 shadow-lg'>
          <h1 className="text-center text-2xl font-bold mb-6">{blogKeyword ? "Update Blog" : "Create Blog"}</h1>
          {blogsForm?.map((item, index) => (
            <section key={index} className="mb-6">
              <label htmlFor={item.label} className="block capitalize font-medium mb-1 text-gray-700">
                {item.label}
              </label>
              <div className="w-full">
                {item.type === 'text' && (
                  <Controller
                    name={item.name}
                    control={control}
                    rules={item.rules}
                    render={({ field }) => (
                      <input
                        {...field}
                        value={blogPostData[item.name] || ""}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:ring focus:ring-blue-400 focus:border-blue-400"
                        type="text"
                        placeholder={item.placeholder}
                      />
                    )}
                  />
                )}
                {item.type === 'textarea' && (
                  <Controller
                    name={item.name}
                    control={control}
                    rules={item.rules}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        value={blogPostData[item.name] || ""}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border focus:outline-none rounded-md bg-gray-100 focus:ring focus:ring-blue-400 focus:border-blue-400"
                        rows={5}
                        placeholder={item.placeholder}
                      />
                    )}
                  />
                )}
              </div>
              {errors[item.name] && (
                <p className="text-red-500 text-sm mt-1">{errors[item.name]?.message}</p>
              )}
            </section>
          ))}
          <div className="mb-6">
            <label htmlFor="image" className="block font-medium mb-1 text-gray-700">
              Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFilesChange}
              className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:ring focus:ring-blue-400 focus:border-blue-400"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {imageURLs.map((imageUrl, index) => (
              <div key={index} className="relative">
                <img src={imageUrl} alt={`Preview ${index + 1}`} className="w-full h-24 rounded-md object-cover" />
                {blogKeyword && (
                  <button
                    type="button"
                    onClick={() => handleImageDelete(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 focus:ring focus:ring-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 focus:ring focus:ring-blue-400"
          >
            {loading ? "Saving..." : blogKeyword ? "Update Blog" : "Create Blog"}
          </button>
        </form>
        <Toaster />
   
    </Layout>
  );
};

export default BlogForm;