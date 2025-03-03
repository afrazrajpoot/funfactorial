import { Toaster } from 'sonner';
import { Suspense } from 'react';
import Image from 'next/image';
import { headers } from 'next/headers';

import SocialShare from './components/SocialShare';
import { BlogActions } from './components/BlogActions';

async function fetchBlogData(keywords) {
  console.log(keywords, 'my keywords');
  try {
    const url = `https://api.funrides.co.uk/api/v1/blogs/${keywords}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Next.js Server'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    console.log('Content-Type:', contentType);

    if (contentType && contentType.includes('application/json')) {
      const blogData = await response.json();
      console.log(blogData, 'my blog data');
      return blogData;
    } else {
      const textResponse = await response.text();
      console.error('Response is not JSON. Raw response:', textResponse);
      throw new Error('Response is not JSON');
    }
  } catch (error) {
    console.error('Fetch Error:', {
      message: error.message,
      stack: error.stack
    });
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { keywords } = params;

  // Fetch the blog data dynamically based on keywords
  const blogData = await fetchBlogData(keywords[0]);

  // If the blog data isn't found, return default metadata
  if (!blogData) {
    return {
      title: 'Danhamz Blog',
      description: 'Read this blog post to learn more.',
      openGraph: {
        type: 'article',
        locale: 'en_US',
        url: `https://danhamz.co.uk/blogs/${keywords[0]}`,
        title: 'Danhamz Blog',
        description: 'Read this blog post to learn more.',
        images: [
          {
            url: 'https://danhamz.co.uk/images/danhamz_logo.jpg',
            width: 1200,
            height: 630,
            alt: 'Danhamz Logo',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        site: '@yourTwitterHandle',
        creator: '@yourTwitterHandle',
        title: 'Danhamz Blog',
        description: 'Read this blog post to learn more.',
        images: ['https://danhamz.co.uk/images/danhamz_logo.jpg'],
      },
    };
  }

  // Enhanced URL generation
  const canonicalUrl = ` https://funrides.co.uk/blog/${keywords[0]}`;
 
  console.log(canonicalUrl, 'url');

  const getFullImageUrl = (fileName) => {
    if (!fileName) return 'https://danhamz.co.uk/images/danhamz_logo.jpg';
    return `https://api.funrides.co.uk/${fileName}`.replace(/([^:]\/)\/+/g, '$1');
  };

  const imageUrl = getFullImageUrl(blogData.image1?.fileName);
  console.log(imageUrl, 'image url meta');

  return {
    metadataBase: new URL('https://funrides.co.uk'),
    title: blogData.keywords,
    description: blogData.info1 || 'Read this blog post to learn more.',
    canonical: canonicalUrl,
    openGraph: {
      type: 'article',
      locale: 'en_US',
      url: canonicalUrl,
      title: blogData.keywords,
      description: blogData.info1 || 'Read this blog post to learn more.',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blogData.keywords,
        },
      ],
      publishedTime: blogData.createdAt,
      authors: [blogData.name],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@yourTwitterHandle',
      creator: '@yourTwitterHandle',
      title: blogData.keywords,
      description: blogData.info1 || 'Read this blog post to learn more.',
      images: [imageUrl],
    },
  };
}

export default async function ReadSingleBlog({ params }) {
  const { keywords } = params;

  if (!keywords || !keywords[0]) {
    return <p>Invalid blog keywords.</p>;
  }
  const blogData = await fetchBlogData(keywords[0]);
  console.log(blogData,'blog dataaaaaaaa')
  if (!blogData) {
    return <p>Failed to load blog data.</p>;
  }

  const headersList = headers();
  const activePath = headersList.get('x-invoke-path') || '';
console.log(activePath,'active path')
  const getFullImageUrl = (fileName) => {
    if (!fileName) return '/images/danhamz_logo.jpg';
    return `https://api.funrides.co.uk/${fileName}`.replace(/([^:]\/)\/+/g, '$1');
  };

  return (
    <main>
      <Toaster />
      <Suspense fallback={<h1>Loading...</h1>}>
        {blogData && (
          <>
            <BlogActions
              blogId={blogData._id}
              keywords={keywords}
              admin={activePath.includes('/admin') ? 'admin' : 'user'}
            />
            <section className="p-[2vw] bg-white">
              <h1 className="text-[#152347] text-center text-[5vw] md:text-[3vw] font-medium">
                All you want to know about us
              </h1>
              <div className="flex items-center flex-col my-[4vw] md:my-[2vw]">
                <SocialShare
                  fbURL={`https://funrides.co.uk${activePath}`}
                  twURL={`https://funrides.co.uk${activePath}`}
                  waURL={`https://funrides.co.uk${activePath}`}
                  title={blogData.title}
                  image={getFullImageUrl(blogData.image1?.fileName)}
                />
                <p>Click here to share this article</p>
              </div>

              {[...Array(15)].map((_, index) => (
                <main className="my-[1vw]" key={index}>
                  <article className="flex flex-col w-full my-[5vw] justify-around items-center">
                    {blogData[`image${index + 1}`]?.fileName && (
                      <figure className="w-full max-w-[80vw] md:max-w-[50vw] rounded-md">
                        <img
                          src={getFullImageUrl(blogData[`image${index + 1}`]?.fileName)}
                          alt={`blog_image_${index + 1}`}
                          className="w-full rounded-md"
                        />
                      </figure>
                    )}
                    {blogData[`heading${index + 1}`]?.trim() && (
                      <h1 className="text-[#152347] font-semibold text-start w-full max-w-[70vw] md:max-w-[50vw] text-[4.5vw] md:text-[1.5vw] mt-[5vw] md:mt-2vw">
                        {blogData[`heading${index + 1}`]}
                      </h1>
                    )}
                  </article>
                  {blogData[`info${index + 1}`]?.trim() && (
                    <div className="text-[#152347] mt-[5vw] md:[mt-3vw] w-full max-w-[70vw] md:max-w-[50vw] mx-auto text-[3vw] md:text-[2vw] lg:text-[1vw]">
                      {blogData[`info${index + 1}`]
                        ?.split('\n')
                        .filter((paragraph) => paragraph.trim() !== '') // Filter out empty paragraphs
                        .map((paragraph, idx) => (
                          <div key={idx}>
                            <p>{paragraph}</p>
                            {idx !==
                              blogData[`info${index + 1}`]
                                ?.split('\n')
                                .filter((paragraph) => paragraph.trim() !== '').length - 1 && <br />}
                          </div>
                        ))}
                    </div>
                  )}
                </main>
              ))}


              <p className="text-[#152347] mt-[5vw] md:[mt-3vw] font-medium w-full max-w-[80vw] mx-auto text-[3vw] md:text-[2vw]">
                By: {blogData?.name}
              </p>
            </section>
          </>
        )}
      </Suspense>
    </main>
  );
}
