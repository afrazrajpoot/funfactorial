import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalState } from "../context/globalState";
import { 
  FaShoppingCart, 
  FaInfoCircle, 
  FaTag, 
  FaStar, 
  FaHeart,
  FaCheckCircle 
} from "react-icons/fa";
import { motion } from "framer-motion";

const Card = ({ 
  title, 
  price, 
  image, 
  rating = 4.5, 
  description, 
  updateInfo, 
  onUpdateClick 
}) => {
  const { setItemDetail } = useGlobalState();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  // Utility function to get image source
  const getImageSrc = () => {
    const staticImages = {
      "30ft Jungle Mini Assault Course Fun Run": "30ft-jun.png",
      "Go karts": "img2.jpg",
      "Zorb Balls": "zorbBalls.jpg",
      "MEGA WAVE BOUNCY SLIDE": "megaWave.png",
      "TODDLER SLIDE": "toddlerSlide.jpg",
      "Bouncy Castle": "bouncyCastle.png",
      "Penalty Shoot Out": "shootOut.jpg",
      "Chocolate Fountain": "fountain.jpg",
      "Rainbow Giant Slide": "giant.png",
      "3D Dinosaur Bouncy Castle With Front Slide": "dainosor-gr.png",
      "3D Lion Bouncy Castle With Front Slide": "lion-ye.png",
      "3D Monster Truck Bouncy Castle With Front Slide": "truck-bl.png",
      "Bungee Run Hire 35ft": "bungee.png"
    };

    return (
      staticImages[title] 
        ? `/images/${staticImages[title]}` 
        : image?.url 
          ? `https://bouncycastlenetwork-res.cloudinary.com/image/upload/f_auto,q_auto,c_limit,w_700/${image.url}` 
          : image?.img 
            ? image.img 
            : "https://via.placeholder.com/300"
    );
  };

  // Calculate price with additional fee
  const calculatedPrice = Number(price?.replace(/[^0-9.-]+/g, "") || 0) + 125;

  const handleClick = () => {
    setItemDetail({ name: title, price: calculatedPrice });
    navigate(`/${title}`);
  };

  // Render star rating
  const renderStarRating = () => {
    return [...Array(5)].map((_, index) => (
      <FaStar 
        key={index} 
        className={`
          ${index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}
          inline-block mr-1 transition-colors duration-200
        `}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="group relative w-full max-w-sm mx-auto bg-white rounded-2xl shadow-lg overflow-hidden 
        transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-3 
        border border-gray-100 hover:border-transparent"
    >
      {/* Image Section */}
      <div className="relative h-64 w-full overflow-hidden">
        {/* Favorite Button */}
        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 left-4 z-10 bg-white/70 p-2 rounded-full shadow-md 
            hover:bg-white transition-all duration-300"
        >
          <FaHeart 
            className={`
              ${isFavorite ? 'text-red-500' : 'text-gray-400'}
              transition-colors duration-200
            `} 
          />
        </button>

        {/* Price and Delivery Badges */}
        <div className="absolute top-4 right-4 z-10 flex space-x-2">
          <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full shadow-md 
            group-hover:bg-blue-600 transition-colors">
            Delivery Included
          </span>
          <span className="bg-green-500 text-white text-sm px-3 py-1 rounded-full shadow-md 
            flex items-center group-hover:bg-green-600 transition-colors">
            £{calculatedPrice.toFixed(2)}
            <FaTag className="ml-1" />
          </span>
        </div>

        {/* Image with Overlay */}
        <div className="relative w-full h-full">
          <img
            src={getImageSrc()}
            alt={title}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/300";
            }}
            className="absolute inset-0 w-full h-full object-cover 
              transition-transform duration-300 group-hover:scale-110 
              brightness-90 group-hover:brightness-100"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 
            opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 bg-white space-y-3">
        {/* Title and Rating */}
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800 truncate pr-2 
            group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <div className="flex items-center">
            {renderStarRating()}
            <span className="text-sm text-gray-500 ml-2">
              ({rating})
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          {updateInfo ? (
            <button 
              onClick={onUpdateClick} 
              className="w-full text-blue-500 border border-blue-500 
                hover:bg-blue-500 hover:text-white px-4 py-2 rounded-lg 
                text-sm transition-all flex items-center justify-center"
            >
              <FaCheckCircle className="mr-2" />
              Update Info
            </button>
          ) : (
            <Link
              to={`/${title}`}
              className="w-full text-center text-gray-600 hover:text-blue-600 
                flex items-center justify-center text-sm transition-colors 
                border border-gray-300 rounded-lg py-2 hover:border-blue-500"
            >
              <FaInfoCircle className="mr-2" />
              View Details
            </Link>
          )}
          
          <button
            onClick={handleClick}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white 
              font-bold py-3 px-4 rounded-lg transition-all transform 
              hover:scale-105 flex items-center justify-center text-sm 
              shadow-md hover:shadow-lg"
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