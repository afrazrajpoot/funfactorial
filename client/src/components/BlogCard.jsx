'use client'
import React from "react";
import Link from "next/link";

const BlogCard = ({ img, title, info, avatar, name, keywords,_id }) => {

  // State to manage the image error for both the main and avatar images
  const [isMainImageError, setIsMainImageError] = React.useState(false);
  const [isAvatarError, setIsAvatarError] = React.useState(false);
  // Truncate function for consistent text length
  const truncate = (text, length) => {
    return text && text.length > length 
      ? `${text.substring(0, length)}...` 
      : text;
  };

  return (
    <div className="
      group 
      relative 
      transform 
      transition-all 
      duration-300 
      hover:-translate-y-2 
      hover:shadow-2xl 
      bg-white 
      rounded-xl 
      overflow-hidden 
      border 
      border-gray-100 
      max-w-sm 
      mx-auto 
      hover:border-amber-100
    ">
      {/* Blog Image */}
      <div className="
        relative 
        overflow-hidden 
        h-48 
        w-full
      ">
        <img 
          src={isMainImageError ? "/images/no_preview.webp" : img || "/images/no_preview.webp"}
          alt={title || "Blog post image"}
          onError={() => setIsMainImageError(true)}
          className="
            w-full 
            h-full 
            object-cover 
            transition-transform 
            duration-500 
            group-hover:scale-110
          "
        />
        {/* Keywords Overlay */}
        {/* {keywords && (
          <div className="
            absolute 
            top-2 
            right-2 
            bg-amber-400/80 
            text-[#152347] 
            px-2 
            py-1 
            rounded-full 
            text-xs 
            font-semibold
          ">
            {truncate(keywords, 15)}
          </div>
        )} */}
      </div>

      {/* Blog Content */}
      <div className="
        p-4 
        space-y-3 
        relative
      ">
        {/* Blog Title */}
        <h2 className="
          text-xl 
          font-bold 
          text-[#152347] 
          group-hover:text-amber-600 
          transition-colors 
          duration-300
        ">
          {truncate(title, 50)}
        </h2>

        {/* Blog Excerpt */}
        <p className="
          text-gray-600 
          text-sm 
          leading-relaxed
        ">
          {truncate(info, 120)}
        </p>

        {/* Author and Read More Section */}
        <div className="
          flex 
          items-center 
          justify-between 
          pt-4 
          border-t 
          border-gray-200
        ">
          {/* Author Profile */}
          <div className="
            flex 
            items-center 
            space-x-3
          ">
            <img 
              src={isAvatarError ? "/images/no_preview.webp" : avatar || img || "/images/blog1.jpg"}
              alt={`${name}'s avatar`}
              onError={() => setIsAvatarError(true)}
              className="
                w-10 
                h-10 
                rounded-full 
                object-cover 
                border-2 
                border-amber-400
                group-hover:border-[#152347] 
                transition-all 
                duration-300
              "
            />
            <span className="
              text-sm 
              font-semibold 
              text-[#152347]
            ">
              {truncate(name, 15)}
            </span>
          </div>

          {/* Read More Button */}
          <Link 
            href={`/blogs/${keywords}`} 
            className="group"
          >
            <button className="
              px-3 
              py-1 
              text-sm 
              bg-amber-400 
              text-[#152347] 
              rounded-md 
              font-semibold 
              transition-all 
              duration-300 
              hover:bg-[#152347] 
              hover:text-white 
              focus:outline-none 
              focus:ring-2 
              focus:ring-amber-400 
              focus:ring-offset-2
            ">
              Read More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
