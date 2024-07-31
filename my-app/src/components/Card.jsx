import React from "react";
import { Link } from "react-router-dom";

const Card = ({ bgImg, title, img, price, w, ind }) => {
  return (
    <main
      className={`relative lg:w-[17vw] overflow-hidden w-[90vw] lg:ml-[0vw] ml-[5vw]`}
    >
      <p
        style={{ textShadow: "2px 2px 0 white" }}
        className="absolute top-[1vw] left-[43vw]  lg:left-[7vw] font-bold lg:text-[1.5vw]"
      >
        {price}
      </p>
      <figure className="w-full">
        <img
          src={bgImg}
          alt="img"
          className="lg:w-full w-[97vw] lg:max-w-[30vw] lg:h-[60vh]"
        />
        <img
          src={img}
          alt="img"
          className="absolute top-[20vw] lg:top-[6vw] w-[74vw] lg:w-[15vw] left-[8vw] lg:left-[1vw] transform transition-transform duration-300 ease-in-out hover:scale-110"
        />
      </figure>
      <Link to={`/${ind}`} className="">
        <p className="absolute font-ab lg:px-[0vw] text-[4.5vw] px-[15vw] top-[93vw]   lg:top-[22vw] transition-all duration-300 hover:text-yellow-400 hover:cursor-pointer  lg:w-full lg:max-w-[17vw] text-center ml-[0vw] lg:text-[1vw] font-bold text-white lg:p-[0vw] ">
          {title}
        </p>
      </Link>
    </main>
  );
};

export default Card;
