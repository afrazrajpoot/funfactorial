import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
  FaArrowLeft,
  FaArrowRight,
  FaTimes,
} from "react-icons/fa";
import {SizeTable, InflatableDetailsTable, UsersTable} from "../components/InflatableDetailsTable";

const DetailContent = ({ itemData }) => ( 
  <Fade in={true} timeout={500}>
    <div className="space-y-6">
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 flex items-center">
        <FaStar className="text-yellow-400 mr-3" />
        Description
      </h1>
     
    
     {
      itemData.description === 'https://youtu.be/s2w_4OBgKs8' ? <iframe width="560" height="315" src="https://www.youtube.com/embed/s2w_4OBgKs8?si=JXavX1ge11h_6zxD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>: <p className="text-lg text-gray-600 leading-relaxed">
      {itemData.description}
    </p>
     }
      <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            Price
          </h2>
         
          <div className="bg-blue-500 hover:cursor-pointer text-white px-3 py-1 rounded-full text-sm font-semibold">
            {itemData.isPremium ? "Drop and Go" : "2 operators"}
          </div>
        </div>
        <p className="text-3xl font-bold text-green-600">£{itemData.price}</p>
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
             Offer Price
          </h2>
        <p className="text-3xl font-bold text-green-600">£{itemData.Offer}</p>

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

const Users = ({ itemData }) => (
  <Fade in={true} timeout={500}>
    <div className="space-y-6">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 flex items-center">
        <FaUsers className="text-purple-500 mr-3" />
        Users 
      </h2>
      <UsersTable size={itemData?.size} suitability={itemData?.users} />
    </div>
  </Fade>
);

const TestsContent = ({ itemData }) => (
  <Fade in={true} timeout={500}>
    <div className="space-y-6">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 flex items-center">
        <FaFlask className="text-red-500 mr-3" />
        Additional information
      </h2>
      <div className="bg-red-50 p-6 rounded-lg shadow-md">
        <p className="text-lg text-red-800 leading-relaxed">
        {itemData.additionalInformation}
        </p>
      </div>
    </div>
  </Fade>
);

const ImagePreview = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-64 lg:h-96">
      <AnimatePresence initial={false}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="absolute w-full h-full object-cover rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>
      <button
        onClick={prevImage}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={nextImage}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

const ImageModal = ({ image, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.8 }}
      className="relative max-w-3xl max-h-[90vh] overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <img src={image} alt="Full size preview" className="w-full h-full object-contain" />
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2"
      >
        <FaTimes size={24} />
      </button>
    </motion.div>
  </motion.div>
);

const ImageGrid = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <div className="grid grid-cols-3 gap-2 mt-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer overflow-hidden rounded-lg shadow-md"
            onClick={() => setSelectedImage(image)}
          >
            <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-20 object-cover" />
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {selectedImage && (
          <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
        )}
      </AnimatePresence>
    </>
  );
};






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
    { name: "Users", icon: <FaUsers /> },
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
      navigate('/');
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
      encryptAndSaveToLocalStorage('data', { name: itemData?.title, price: itemData?.price, id: id, image: itemData?.img });
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
      case "Users":
        return <Users itemData={itemData} />;
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
                <div className="w-full lg:w-1/3 p-4">
                  <ImagePreview images={itemData.images || [itemData.img]} />
                  <ImageGrid images={itemData.images || [itemData.img]} />
                </div>

                <section className="lg:w-2/3 lg:ml-8 flex flex-col">
                  <div className="flex flex-col lg:flex-row mb-6 bg-gray-200 rounded-lg p-2">
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
