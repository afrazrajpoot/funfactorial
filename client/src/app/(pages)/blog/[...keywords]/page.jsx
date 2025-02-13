// page.js
// import BlogContent from './BlogContent.server';

import BlogContent from "./components/BlogContent";

const ReadSingleBlog = ({ params }) => {
  const keywords = params.keywords[0]; // Extract the first segment
  console.log("Extracted keywords:", keywords);

  return (
    <BlogContent params={params} />
  );
};

export default ReadSingleBlog;