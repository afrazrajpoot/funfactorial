import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalState } from "../context/globalState";
import { FaShoppingCart, FaInfoCircle, FaStar, FaTag, FaEye } from "react-icons/fa";
import { motion } from "framer-motion";
import { Calendar, Truck } from "lucide-react";
import { alertTitleClasses } from "@mui/material";

const Card = ({ title, price, ind,image, rating = 4.5, w ,description }) => {
  const { setItemDetail } = useGlobalState();
  const navigate = useNavigate();

  const handleClick = () => {
    setItemDetail({ name: title, price: price });
    navigate(`/${title}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-[75vw] ml-[13vw] my-[2vw] lg:w-[17vw] lg:ml-[0vw] lg:h-[25vw] h-[100vw] overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl bg-white"
    >
       <div className="absolute top-4 right-4 flex items-center gap-2">
        {/* <button className="bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition-colors">
          <span>Pick</span>
       
        </button>
        <button className="bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition-colors">
          <span>Drop</span>
         
        </button> */}
  {
  title && (
    <button className="bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition-colors">
      <span>
        {{
          'Go karts': 'Deliver and Staff Incl',
          'Zorb Balls': 'Deliver and Staff Incl',
          'Rainbow Giant Slide':'Deliver and Staff Incl',
          'MEGA WAVE BOUNCY SLIDE': 'Deliver and Staff Incl',
          'Bouncy Castle':'Deliver and Staff Incl',
          'TODDLER SLIDE':'Deliver and Staff Incl',
          'Penalty Shoot Out':'Deliver and Staff Incl',
        }[title] || 'Deliver & Install'}
      </span>
    </button>
  )
}

        <div className="bg-green-500 text-white px-3 py-1 rounded-full shadow-md z-10">
          <p className="font-bold text-lg flex items-center">
            £{Number(price?.replace(/[^0-9.-]+/g, "")) + 125}
            <FaTag className="ml-1" />
          </p>
        </div>
      </div>
      {title === '30ft Jungle Mini Assault Course Fun Run' ? (
        <img
        src={`/images/30ft-jun.png`}
        onError={(e)=> (e.target.src=`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE_yw4uHAx7GG3au9rfReqDruLTXC39TYJxTxcsPcerxT4bHboHgYDQ1aNe_Ys8emA_38&usqp=CAU`)}
        alt={title}
        className="absolute lg:h-[15vw] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
      />
      ): title === 'Go karts' ? (
        <img
        src={`/images/img2.jpg`}
        onError={(e)=> (e.target.src=`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE_yw4uHAx7GG3au9rfReqDruLTXC39TYJxTxcsPcerxT4bHboHgYDQ1aNe_Ys8emA_38&usqp=CAU`)}
        alt={title}
        className="absolute lg:h-[15vw] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
      />
      ):
      title === 'Zorb Balls' ? (
        <img
        src={`/images/zorbBalls.jpg`}
        onError={(e)=> (e.target.src=`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE_yw4uHAx7GG3au9rfReqDruLTXC39TYJxTxcsPcerxT4bHboHgYDQ1aNe_Ys8emA_38&usqp=CAU`)}
        alt={title}
        className="absolute lg:h-[15vw] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
      />
      ):
      title === 'MEGA WAVE BOUNCY SLIDE' ? (
        <img
        src={`/images/megaWave.png`}
        onError={(e)=> (e.target.src=`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE_yw4uHAx7GG3au9rfReqDruLTXC39TYJxTxcsPcerxT4bHboHgYDQ1aNe_Ys8emA_38&usqp=CAU`)}
        alt={title}
        className="absolute lg:h-[15vw] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
      />
      ):
      title === 'TODDLER SLIDE' ? (
        <img
        src={`/images/toddlerSlide.jpg`}
        onError={(e)=> (e.target.src=`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE_yw4uHAx7GG3au9rfReqDruLTXC39TYJxTxcsPcerxT4bHboHgYDQ1aNe_Ys8emA_38&usqp=CAU`)}
        alt={title}
        className="absolute lg:h-[15vw] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
      />
      ):
      title === 'Bouncy Castle' ? (
        <img
        src={`/images/bouncyCastle.png`}
        onError={(e)=> (e.target.src=`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE_yw4uHAx7GG3au9rfReqDruLTXC39TYJxTxcsPcerxT4bHboHgYDQ1aNe_Ys8emA_38&usqp=CAU`)}
        alt={title}
        className="absolute lg:h-[15vw] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
      />
      ):
      title === 'Penalty Shoot Out' ? (
        <img
        src={`/images/shootOut.jpg`}
        onError={(e)=> (e.target.src=`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE_yw4uHAx7GG3au9rfReqDruLTXC39TYJxTxcsPcerxT4bHboHgYDQ1aNe_Ys8emA_38&usqp=CAU`)}
        alt={title}
        className="absolute lg:h-[15vw] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
      />
      ):
      title === 'Chocolate Fountain' ? (
        <img
        src={`/images/fountain.jpg`}
        onError={(e)=> (e.target.src=`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE_yw4uHAx7GG3au9rfReqDruLTXC39TYJxTxcsPcerxT4bHboHgYDQ1aNe_Ys8emA_38&usqp=CAU`)}
        alt={title}
        className="absolute lg:h-[15vw] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
      />
      ):
      title === 'Rainbow Giant Slide' ? (
        <img
        src={`/images/giant.png`}
        onError={(e)=> (e.target.src=`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE_yw4uHAx7GG3au9rfReqDruLTXC39TYJxTxcsPcerxT4bHboHgYDQ1aNe_Ys8emA_38&usqp=CAU`)}
        alt={title}
        className="absolute lg:h-[15vw] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
      />
      ):
      title === '3D Dinosaur Bouncy Castle With Front Slide' ? (
        <img
        src={`/images/dainosor-gr.png`}
        onError={(e)=> (e.target.src=`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE_yw4uHAx7GG3au9rfReqDruLTXC39TYJxTxcsPcerxT4bHboHgYDQ1aNe_Ys8emA_38&usqp=CAU`)}
        alt={title}
        className="absolute lg:h-[15vw] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
      />
      ) : 
      title === '3D Lion Bouncy Castle With Front Slide' ? (
        <img
        src={`/images/lion-ye.png`}
        onError={(e)=> (e.target.src=`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE_yw4uHAx7GG3au9rfReqDruLTXC39TYJxTxcsPcerxT4bHboHgYDQ1aNe_Ys8emA_38&usqp=CAU`)}
        alt={title}
        className="absolute lg:h-[15vw] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
      />
      ) : 
      title === '3D Monster Truck Bouncy Castle With Front Slide' ? (
        <img
        src={`/images/truck-bl.png`}
        onError={(e)=> (e.target.src=`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE_yw4uHAx7GG3au9rfReqDruLTXC39TYJxTxcsPcerxT4bHboHgYDQ1aNe_Ys8emA_38&usqp=CAU`)}
        alt={title}
        className="absolute lg:h-[15vw] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
      />
      ) 
      : 
      title === 'Bungee Run Hire 35ft' ? (
        <img
        src={`/images/bungee.png`}
        onError={(e)=> (e.target.src=`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE_yw4uHAx7GG3au9rfReqDruLTXC39TYJxTxcsPcerxT4bHboHgYDQ1aNe_Ys8emA_38&usqp=CAU`)}
        alt={title}
        className="absolute lg:h-[15vw] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
      />
      )
      : (
      <img
        src={`https://bouncycastlenetwork-res.cloudinary.com/image/upload/f_auto,q_auto,c_limit,w_700/${image?.url}` || image?.img}
        onError={(e)=> (e.target.src=`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE_yw4uHAx7GG3au9rfReqDruLTXC39TYJxTxcsPcerxT4bHboHgYDQ1aNe_Ys8emA_38&usqp=CAU`)}
        alt={title}
        className="absolute lg:h-[15vw] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
      />)
      }
      

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white">
        <h3 className="text-gray-800 text-xl font-bold mb-2 truncate">{title}</h3>
        <div className="flex justify-between items-center mb-3">
        </div>
        <div className="flex justify-between items-center">
          <Link
            to={`/${title}`}
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
