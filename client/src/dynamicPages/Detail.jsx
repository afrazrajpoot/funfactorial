import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { cardData } from "../data";
import Ribbons from "../components/Ribbons";
import { Button, Fade, Grow } from "@mui/material";
import { useGlobalState } from "../context/globalState";
import { useAvalbilityMutation } from "../store/storeApi";
import Loading from "../components/Loader";
import { toast } from "sonner";
import CryptoJS from 'crypto-js';
import {
  FaStar,
  FaInfoCircle,
  FaRuler,
  FaCheckCircle,
  FaFlask,
  FaShoppingCart,
  FaDollarSign,
  FaCalendarAlt,
  FaUsers,
} from "react-icons/fa";
import {SizeTable,InflatableDetailsTable} from "../components/InflatableDetailsTable";

const DetailContent = ({ itemData }) => (
  <Fade in={true} timeout={500}>
    <div className="space-y-6">
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 flex items-center">
        <FaStar className="text-yellow-400 mr-3" />
        Description
      </h1>
      <p className="text-lg text-gray-600 leading-relaxed">
        {itemData.description}
      </p>
      <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <FaDollarSign className="text-green-500 mr-2" />
          Price
        </h2>
        <p className="text-3xl font-bold text-green-600">{itemData.price}</p>
      </div>
    </div>
  </Fade>
);

const SizeContent = ({ itemData }) => (
  <Fade in={true} timeout={500}>
    <div className="space-y-6">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 flex items-center">
        <FaRuler className="text-blue-500 mr-3" />
        Size Information
      </h2>
      {/* <div className="bg-blue-50 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-blue-700 mb-4">Dimensions</h3>
        <ul className="list-disc pl-5 space-y-2 text-blue-800">
          {itemData?.size?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div> */}
      <SizeTable  size={itemData?.size} />
    </div>
  </Fade>
);

const SuitabilityContent = ({ itemData }) => (
  <Fade in={true} timeout={500}>
    <div className="space-y-6">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 flex items-center">
        <FaUsers className="text-purple-500 mr-3" />
        Suitability 
      </h2>
      <InflatableDetailsTable size={itemData?.size} suitability={itemData?.suitability} />
    </div>
  </Fade>
);

const TestsContent = ({ itemData }) => (
  <Fade in={true} timeout={500}>
    <div className="space-y-6">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 flex items-center">
        <FaFlask className="text-red-500 mr-3" />
        Safety Tests
      </h2>
      <div className="bg-red-50 p-6 rounded-lg shadow-md">
        <p className="text-lg text-red-800 leading-relaxed">
          All our products, including the {itemData.title}, undergo rigorous safety tests to ensure they meet the highest standards.
          Your safety is our top priority, and we spare no effort in making sure our equipment
          is secure and reliable for all users.
        </p>
      </div>
    </div>
  </Fade>
);

const Detail = () => {
  const [activeTab, setActiveTab] = useState("Description");
  const { id } = useParams();
  const navigate = useNavigate();
  const index = Number(id);
  const itemData = index >= 0 && index < cardData.length ? cardData[index] : null;

  const buttons = [
    { name: "Description", icon: <FaInfoCircle /> },
    { name: "Size", icon: <FaRuler /> },
    { name: "Suitability", icon: <FaUsers /> },
    { name: "Tests", icon: <FaFlask /> },
  ];

  const { itemDetail, setItemDetail } = useGlobalState();
  const [available, { isLoading, isSuccess, isError, data }] = useAvalbilityMutation();

  const handleClick = async () => {
    await available({ itemName: itemData.title });
  };

  const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;
  const encryptAndSaveToLocalStorage = (key, object) => {
    const jsonString = JSON.stringify(object);
    const encryptedData = CryptoJS.AES.encrypt(jsonString, SECRET_KEY).toString();
    localStorage.setItem(key, encryptedData);
  };

  useEffect(() => {
    if (itemData === null) {
      // Redirect to a different page if itemData is null
      navigate('/'); // or any other page you want to redirect to
    }

    if (isSuccess) {
      toast.success(data?.message, {
        position: "top-center",
        duration: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
    if (isError) {
      setItemDetail({ name: itemData?.title, price: itemData?.price, id: id });
      encryptAndSaveToLocalStorage('data', { name: itemData?.title, price: itemData?.price, id: id,image:itemData?.img });
      navigate(`/contact`);
    }
  }, [isSuccess, isError, itemData]);

  const renderContent = () => {
    switch (activeTab) {
      case "Description":
        return <DetailContent itemData={itemData} />;
      case "Size":
        return <SizeContent itemData={itemData} />;
      case "Suitability":
        return <SuitabilityContent itemData={itemData} />;
      case "Tests":
        return <TestsContent itemData={itemData} />;
      default:
        return <DetailContent itemData={itemData} />;
    }
  };

  return (
    <main className="flex mt-8 w-full bg-gray-100 min-h-screen">
      <section className="mt-4 hidden lg:block">
        <Ribbons />
      </section>
      <section className="p-8 w-full lg:max-w-[80vw]">
        {itemData ? (
          <Grow in={true} timeout={800}>
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-red-600 to-red-800 w-full p-6" style={{ backgroundImage: `url(${itemData.bgImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <h1 className="font-bold text-center text-4xl lg:text-5xl text-white">
                  {itemData.title}
                </h1>
              </div>

              <article className="flex lg:flex-row flex-col p-6">
                <figure className="w-full lg:w-1/3 p-4">
                  <img src={itemData.img} alt={itemData.title} className="rounded-lg shadow-md w-full object-cover h-64 lg:h-auto" />
                </figure>

                <section className="lg:w-2/3 lg:ml-8 flex flex-col">
                  <div className="flex mb-6 bg-gray-200 rounded-lg p-2">
                    {buttons?.map((button, i) => (
                      <button
                        onClick={() => setActiveTab(button.name)}
                        key={i}
                        className={`flex items-center justify-center w-full px-4 py-3 text-sm lg:text-base font-medium transition duration-300 rounded-md ${
                          activeTab === button.name
                            ? "bg-red-600 text-white shadow-md"
                            : "text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {button.icon}
                        <span className="ml-2">{button.name}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex-grow">
                    {renderContent()}
                  </div>

                  <Button
                    onClick={handleClick}
                    variant="contained"
                    className="mt-8 p-4 bg-green-500 hover:bg-green-600 transition duration-300 w-full text-lg font-bold"
                    startIcon={<FaShoppingCart className="text-2xl" />}
                  >
                    {isLoading ? <Loading /> : `Book now for ${itemData.price}`}
                  </Button>
                </section>
              </article>
            </div>
          </Grow>
        ) : (
          <p className="text-center text-gray-600 text-xl">Data not found</p>
        )}
      </section>
    </main>
  );
};

export default Detail;
