import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalState } from "../context/globalState";

const Card = ({ bgImg, title, img, price, w, ind, ml }) => {
  const { itemDetail, setItemDetail } = useGlobalState();
  const navigate = useNavigate();
  const handleClick = () => {
    setItemDetail({ name: title, price: price });
    navigate(`/${ind}`);
  };
  return (
    <main className={`relative lg:w-[17vw] overflow-hidden w-[90vw] lg:ml-[0vw] ml-[5vw]`}>
      <p
        style={{ textShadow: "2px 2px 0 white" }}
        className="absolute top-[1vw] left-[43vw]  lg:left-[7vw] font-bold lg:text-[1.5vw]"
      >
        {price}
      </p>
      <div className="w-full overflow-hidden">
        <img src={bgImg} alt="img" className="lg:w-full w-[97vw] lg:max-w-[30vw] lg:h-[65vh]" />
        <figure className="w-full overflow-hidden">
          <img
            src={img}
            alt="img"
            className="absolute top-[20vw] lg:top-[6vw] h-[15vw] w-[74vw] lg:w-[15vw] left-[8vw] lg:left-[1vw] transform transition-transform object-cover duration-300  ease-in-out hover:scale-110"
          />
        </figure>
      </div>
      <Link to={`/${ind}`}>
        <p className="absolute  font-ab  text-[4.5vw] px-[15vw] top-[93vw]   lg:top-[22vw] transition-all duration-300 hover:text-yellow-400 hover:cursor-pointer  lg:w-full lg:max-w-[17vw] text-center ml-[0vw] lg:text-[1.5vw] font-bold text-white lg:px-[1.5vw] ">
          {title}
        </p>
      </Link>
    </main>
  );
};

export default Card;
