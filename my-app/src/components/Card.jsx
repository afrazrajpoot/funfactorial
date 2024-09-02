import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalState } from "../context/globalState";
import { FaShoppingCart, FaInfoCircle, FaStar, FaTag, FaEye } from "react-icons/fa";
import { motion } from "framer-motion";
const Card = ({ title, img, price, ind, rating = 4.5, w }) => {
  const { setItemDetail } = useGlobalState();
  const navigate = useNavigate();
  console.log(w, "w");
  const handleClick = () => {
    setItemDetail({ name: title, price: price });
    navigate(`/${ind}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`relative w-[85vw] lg:w-[17vw] lg:ml-[0vw] ml-[7.5vw] lg:h-[30vw] h-[100vw]  mx-auto overflow-hidden rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl bg-gradient-to-br from-purple-400 via-pink-500 to-red-500`}
    >
      <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-sm" />

      <div className="absolute top-4 left-4 bg-white bg-opacity-20 text-white px-3 py-1 rounded-full shadow-lg backdrop-blur-sm">
        <p className="font-bold text-sm flex items-center">
          <FaTag className="mr-1" /> SALE
        </p>
      </div>

      <div className="absolute top-4 right-4 bg-white bg-opacity-20 text-white px-3 py-1 rounded-full shadow-lg backdrop-blur-sm">
        <p className="font-bold text-lg flex items-center">
          {price} <FaTag className="ml-1 text-green-300" />
        </p>
      </div>

      <img
        src={img}
        alt={title}
        className="absolute lg:h-[20vw] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 object-cover rounded-xl shadow-xl transition-transform duration-300 hover:scale-110"
      />

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent backdrop-blur-sm">
        <h3 className="text-white text-2xl font-bold mb-2 truncate">{title}</h3>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <FaStar className="text-yellow-300 mr-1" />
            <span className="text-white font-semibold">{rating}</span>
          </div>
          <div className="text-white flex items-center">
            <FaEye className="mr-1" /> 1.2k views
          </div>
        </div>
        <div className="flex justify-between items-center">
          <Link
            to={`/${ind}`}
            className="text-white hover:text-yellow-400 transition-colors duration-300 flex items-center"
          >
            <FaInfoCircle className="mr-2" />
            Details
          </Link>
          <button
            onClick={handleClick}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center"
          >
            <FaShoppingCart className="mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
