import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { products } from "../data";
import { Button, Grow } from "@mui/material";
import { useGlobalState } from "../context/globalState";
import { useAvalbilityMutation, useGetProductIngfoQuery } from "../store/storeApi";
import Loading from "../components/Loader";
import { toast } from "sonner";
import CryptoJS from 'crypto-js';
import {
  FaInfoCircle,
  FaRuler,
  FaShoppingCart,
  FaUsers,
} from "react-icons/fa";

import Layout from "../components/Layout";
import { DetailContent, ImageGrid, ImagePreview, SizeContent, SuitabilityContent, TestsContent, Users } from '../components/DetailPageComponents';
import Header from "../components/Header";

const Detail = () => {
  const [activeTab, setActiveTab] = useState("Description");
  const { id } = useParams();
  
  // Replace hyphens with spaces in the ID to match the product title
  let id2 = id.replace(/-/g, ' ');


  const navigate = useNavigate();
  const itemData = products.find(product => product?.title?.toLocaleUpperCase() === id2?.toLocaleUpperCase()); // Find the product by title
  const { isLoading: productLoading, isError: productError, data: productData } = useGetProductIngfoQuery(itemData?.title);

  const buttons = [
    { name: "Description", icon: <FaInfoCircle /> },
    { name: itemData?.size ? "Size" : null, icon: itemData?.size ? <FaRuler /> : null },
    { name: "Suitability", icon: <FaUsers /> },
    { name: "Users", icon: <FaUsers /> },
  ];

  const { itemDetail, setItemDetail } = useGlobalState();
  const [available, { isLoading, isSuccess, isError, data }] = useAvalbilityMutation();

  const handleClick = async () => {
    await available({ itemName: itemData?.title });
  };

  const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;
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
      navigate(`/contact`);
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

  return (
    <>
    <Header />
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
