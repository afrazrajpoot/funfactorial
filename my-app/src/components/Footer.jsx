import React from "react";

const Footer = () => {
  const gradientStyle = {
    background: "linear-gradient(to bottom, #679d1b, #287404)",
  };

  return (
    <footer style={gradientStyle} className="flex justify-between p-[2vw]">
      <p className="text-white font-medium text-[1vw]">
        All Rights Reserved 2024
      </p>
      <figure className="transition-all duration-300 hover:scale-110 ">
        <img
          src="https://bouncycastlenetwork-res.cloudinary.com/image/upload/bcn/bouncy-castle-network-250.png"
          alt="footer image"
        />
      </figure>
    </footer>
  );
};

export default Footer;
