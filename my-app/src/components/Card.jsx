import React from "react";
import { Link } from "react-router-dom";

const Card = ({ bgImg, title, img, price, w, ind }) => {
  return (
    <main className={`relative w-[17vw] overflow-hidden`}>
      <p
        style={{ textShadow: "2px 2px 0 white" }}
        className="absolute top-[1vw] left-[7vw] font-bold text-[1.5vw]"
      >
        {price}
      </p>
      <figure className="w-full">
        <img src={bgImg} alt="img" className="w-full h-[60vh]" />
        <img
          src={img}
          alt="img"
          className="absolute top-[6vw] w-[15vw] left-[0.7vw] transform transition-transform duration-300 ease-in-out hover:scale-110"
        />
      </figure>
      <Link to={`/${ind}`}>
        <p className="absolute font-ab top-[22vw] transition-all duration-300 hover:text-yellow-400 hover:cursor-pointer w-full max-w-[17vw] text-center ml-[0vw] text-[1vw] font-bold text-white">
          {title}
        </p>
      </Link>
    </main>
  );
};

export default Card;
