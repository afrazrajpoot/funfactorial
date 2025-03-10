'use client'
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from 'next/navigation'; // Use next/navigation
import { Button, Grow } from "@mui/material";
import { useAvalbilityMutation, useGetProductIngfoQuery } from "@/app/store/storeApi";
import { toast } from "sonner";
import CryptoJS from 'crypto-js';
import Head from 'next/head';  // Using Next.js Head
import {
  FaInfoCircle,
  FaRuler,
  FaShoppingCart,
  FaUsers,
} from "react-icons/fa";

import { DetailContent, ImageGrid, ImagePreview, SizeContent, SuitabilityContent, TestsContent, Users } from '@/components/DetailPageComponents';
import Header from "@/components/Header";
import { useGlobalState } from "@/context/globalState";
import Loading from "@/components/Loader";
import { products } from "@/app/data";

const Detail = () => {
  const pathname = usePathname();  // Get the current pathname  
  const id = pathname?.split('/')[1].replace(/-/g, ' ');  // Fetch the product ID from the route
  const [activeTab, setActiveTab] = useState("Description");
  const itemData = products?.find(product => product?.title?.toLocaleUpperCase() === id?.toLocaleUpperCase()); // Find the product by title
  const { data: productData } = useGetProductIngfoQuery(itemData?.title);

  const buttons = [
    { name: "Description", icon: <FaInfoCircle /> },
    { name: itemData?.size ? "Size" : null, icon: itemData?.size ? <FaRuler /> : null },
    { name: "Suitability", icon: <FaUsers /> },
    { name: "Users", icon: <FaUsers /> },
  ];

  const { setItemDetail } = useGlobalState();
  const [available, { isLoading, isSuccess, isError, data }] = useAvalbilityMutation();
  const router = useRouter();

  const handleClick = async () => {
    await available({ itemName: itemData?.title });
  };

  const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;
  const encryptAndSaveToLocalStorage = (key, object) => {
    const jsonString = JSON.stringify(object);
    const encryptedData = CryptoJS.AES.encrypt(jsonString, SECRET_KEY).toString();
    localStorage.setItem(key, encryptedData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message, {
        position: "top-center",
        duration: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
    if (isError) {
      setItemDetail({
        name: itemData?.title,
        price: parseFloat(itemData.price.replace(/£/, '')),
        id: id,
        image: itemData?.image?.url,
      });
      encryptAndSaveToLocalStorage('data', {
        name: itemData?.title,
        price: parseFloat(itemData.price.replace(/£/, '')),
        id: id,
        image: itemData?.image?.url,
      });
      router.push(`/contact`);
    }
  }, [isSuccess, isError, itemData]);

  const renderContent = () => {
    switch (activeTab) {
      case 'LongDescription':
        return <DetailContent itemData={itemData} productData={productData} />
      case "Description":
        return <DetailContent itemData={itemData} productData={productData} />;
      case "Size":
        return itemData.size && <SizeContent itemData={itemData} />;
      case "Suitability":
        return <SuitabilityContent itemData={itemData} />;
      case "Tests":
        return <TestsContent itemData={itemData} />;
      case "Users":
        return <Users itemData={itemData} />;
      default:
        return <DetailContent itemData={itemData} />;
    }
  };

  // Metadata for Open Graph and Twitter
  const metaTitle = itemData?.title || "Product Title";
  const metaDescription = itemData?.description || "Product Description";
  const metaImage = itemData?.image?.url || "/default-image.jpg"; // Fallback image

  return (
    <>
      <Header />
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={metaImage} />
        <meta property="og:site_name" content="Danhamz" />
        <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : ''} />
        <meta property="og:type" content="product" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Danhamz" />
        <meta name="twitter:creator" content="@Danhamz" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaImage} />
      </Head>

      <main className="flex mt-8 w-full bg-gray-100 min-h-screen">
        <section className="p-8 w-full lg:max-w-[100vw]">
          {itemData ? (
            <Grow in={true} timeout={800}>
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-[#40327a] to-[#8d6194] w-full p-6">
                  <h1 className="font-bold text-center text-4xl lg:text-5xl text-white">
                    {itemData?.title}
                  </h1>
                </div>

                <article className="flex lg:flex-row flex-col p-6">
                  <div className="w-full lg:w-1/3 p-4">
                    <ImagePreview image={[itemData?.image?.url]} />
                    <ImageGrid images={[itemData?.image?.url]} />
                  </div>

                  <section className="lg:w-2/3 lg:ml-8 flex flex-col">
                    <div className="flex flex-col lg:flex-row mb-6 bg-gray-200 rounded-lg p-2">
                      {buttons?.map((button, i) => (
                        button.name && (
                          <button
                            onClick={() => setActiveTab(button.name)}
                            key={i}
                            className={`flex items-center justify-center w-full px-4 py-3 text-sm lg:text-base font-medium transition duration-300 rounded-md ${
                              activeTab === button.name
                                ? "bg-[#40327a] text-white shadow-md"
                                : "text-gray-700 hover:bg-gray-300"
                            }`}
                          >
                            {button.icon}
                            <span className="ml-2">{button.name}</span>
                          </button>
                        )
                      ))}
                    </div>

                    <div className="flex-grow">
                      {renderContent(itemData)}
                    </div>

                    <Button
                      style={{ backgroundColor: "#40327a" }}
                      onClick={handleClick}
                      variant="contained"
                      className="mt-8 p-4 bg-[#40327a] hover:bg-green-600 transition duration-300 w-full text-lg font-bold"
                      startIcon={<FaShoppingCart className="text-2xl" />}
                    >
                      {isLoading ? <Loading h={'2vh'} w={'2vw'} isButtonLoader={true} /> : `Book now for £${Number(itemData.price.replace(/[^0-9.-]+/g, "")) + 125}`}
                    </Button>
                  </section>
                </article>

                <div className="w-full max-w-[70vw] m-auto mt-[2vw] py-[3vw] space-y-[4vw]">
                  {/* Section 2 */}
                  {productData && (
                    <div className="bg-gray-100 p-[3vw] rounded-lg shadow-lg">
                      <h2 className="text-[3vw] lg:text-[1.5vw] font-bold text-gray-800 flex items-center">
                        {productData?.heading1}
                      </h2>
                      <p
                        className="text-[2.5vw] md:text-[1vw] mt-[1.5vw] text-gray-600"
                        dangerouslySetInnerHTML={{ __html: productData?.longDescription1 }}
                      />
                    </div>
                  )}

                  {/* Section 3 */}
                  {productData && productData?.heading2 && (
                    <div className="bg-gray-100 p-[3vw] rounded-lg shadow-lg">
                      <h2 className="text-[3vw] lg:text-[1.5vw] font-bold flex items-center">
                        {productData?.heading2}
                      </h2>
                      <p
                        className="text-[2.5vw] md:text-[1vw] mt-[1.5vw] text-gray-600"
                        dangerouslySetInnerHTML={{ __html: productData?.longDescription2 }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </Grow>
          ) : (
            <p className="text-center text-gray-600 text-xl">Data not found</p>
          )}
        </section>
      </main>
    </>
  );
};

export default Detail;
