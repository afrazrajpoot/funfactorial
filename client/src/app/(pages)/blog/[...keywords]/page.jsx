// page.js
import { Metadata } from 'next';
import BlogContent from "./components/BlogContent";

// This generates metadata at build time for static pages
// and on-demand for dynamic pages
export async function generateMetadata({ params }) {
  const keywords = params.keywords[0];
  
  try {
    const blogData = await readBlog(keywords);
    
    const metaTitle = blogData?.metaTitle ?? blogData?.title ?? "Default Blog Title";
    const metaDescription = blogData?.metaDescription ?? "Default Blog Description";
    const metaImage = blogData?.image1?.fileName
      ? `${process.env.NEXT_PUBLIC_API_URL}/${blogData.image1.fileName}`
      : `${process.env.NEXT_PUBLIC_API_URL}/default-image.jpg`;
    

      console.log(metaImage,'meta image')
    return {
      metadataBase: new URL('https://api.funrides.co.uk'),
      title: metaTitle,
      description: metaDescription,
      openGraph: {
        title: metaTitle,
        description: metaDescription,
        icons: {
          icon: metaImage,  // This is the basic favicon
        },
        images: [{
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        }],
        siteName: "Danhamz",
        url: `/blogs/${keywords}`,
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
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog Post',
      description: 'Default blog description',
    };
  }
}

// Fetch function
async function readBlog(keywords) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/blogs/${keywords}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );
    
    if (!res.ok) throw new Error('Failed to fetch blog data');
    return res.json();
  } catch (err) {
    console.error("Error fetching blog:", err);
    return {};
  }
}

export default function ReadSingleBlog({ params }) {
  return <BlogContent params={params} />;
}