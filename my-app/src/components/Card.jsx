import React from "react";

const Card = ({ bgImg, title, img, price, w }) => {
  return (
    <main className={`relative w-[${w}vw] overflow-hidden`}>
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
      <p className="absolute font-ab top-[22vw] transition-all duration-300 hover:text-yellow-400 hover:cursor-pointer w-full max-w-[17vw] text-center ml-[0vw] text-[1vw] font-bold text-white">
        {title}
      </p>
    </main>
  );
};

export default Card;
