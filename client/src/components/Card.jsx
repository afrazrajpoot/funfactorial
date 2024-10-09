import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalState } from "../context/globalState";
import { FaShoppingCart, FaInfoCircle, FaStar, FaTag, FaEye } from "react-icons/fa";
import { motion } from "framer-motion";

const Card = ({ title, price, ind,image, rating = 4.5, w }) => {
  const { setItemDetail } = useGlobalState();
  const navigate = useNavigate();

  const handleClick = () => {
    setItemDetail({ name: title, price: price });
    navigate(`/${ind}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-[75vw] ml-[13vw] my-[2vw] lg:w-[17vw] lg:ml-[0vw] lg:h-[25vw] h-[100vw] overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl bg-white"
    >
      <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full shadow-md z-10">
      <p className="font-bold text-lg flex items-center">£
      {Number(price.replace(/[^0-9.-]+/g, "")) + 125}<FaTag className="ml-1" />
    </p>
      </div>
      <img
        src={`https://bouncycastlenetwork-res.cloudinary.com/image/upload/f_auto,q_auto,c_limit,w_700/${image.url}`}
        onError={(e)=> (e.target.src=`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE_yw4uHAx7GG3au9rfReqDruLTXC39TYJxTxcsPcerxT4bHboHgYDQ1aNe_Ys8emA_38&usqp=CAU`)}
        alt={title}
        className="absolute lg:h-[15vw] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
      />

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white">
        <h3 className="text-gray-800 text-xl font-bold mb-2 truncate">{title}</h3>
        <div className="flex justify-between items-center mb-3">
          {/* <div className="flex items-center">
            <FaStar className="text-yellow-400 mr-1" />
            <span className="text-gray-700 font-semibold">{rating}</span>
          </div> */}
          {/* <div className="text-gray-600 flex items-center text-sm">
            <FaEye className="mr-1" /> 1.2k views
          </div> */}
        </div>
        <div className="flex justify-between items-center">
          <Link
            to={`/${ind}`}
            className="text-blue-500 hover:text-blue-700 transition-colors duration-300 flex items-center text-sm"
          >
            <FaInfoCircle className="mr-1" />
            Details
          </Link>
          <button
            onClick={handleClick}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center text-sm"
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
