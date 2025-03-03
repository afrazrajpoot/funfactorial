// BlogContentClient.js
'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";

import { useRouter } from 'next/navigation';
import SocialShare from "./SocialShare";
// import SocialShare from '@/components/SocialShare';

const BlogContentClient = ({ blogData, metaTitle, metaImage }) => {

  console.log(blogData,'meta title')
  const router = useRouter();




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
    return fileName ? `${process.env.NEXT_PUBLIC_API_URL}/${fileName}` : "";
  };
  const getFullImageUrl = (fileName) => {
    if (!fileName) return '/images/danhamz_logo.jpg';
    return`  https://api.funrides.co.uk/api/v1/${fileName}.replace(/([^:]\/)\/+/g, '$1')`;
  };
  return (
    <div className="bg-white p-8 md:p-12 lg:p-16">
     
      
      <h1 className="text-[#152347] text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 text-center">
        {blogData?.title ?? ""}
      </h1>


<div className="flex flex-col justify-center items-center my-8">
          <SocialShare
            fbURL={typeof window !== 'undefined' ? window.location.href : ''}
            twURL={typeof window !== 'undefined' ? window.location.href : ''}
            waURL={typeof window !== 'undefined' ? window.location.href : ''}
            title={blogData.title}
            image={getFullImageUrl(blogData.image1?.fileName)}
          />
          <p className="text-sm md:text-base lg:text-lg ml-4">Click here to share this article</p>
        </div>

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
      <Toaster />
    </div>
  );
};

export default BlogContentClient;