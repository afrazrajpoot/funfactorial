import React from "react";
import { motion } from "framer-motion";
import MobileHeader from "./MobileHeader";
import Slider from "react-slick";
import { slideImages } from "../data";
import { Link } from "react-router-dom";

const TopHeader = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,

    pauseOnHover: false,
  };

  const imagesGroup2 = [
    {
      img: "https://www.funfactorleeds.co.uk/theme/phone-number-1@1x.png",
    },
  ];

  return (
    <>
      <MobileHeader />

      <div className="relative overflow-hidden">
        {/* <Slider {...sliderSettings} className="h-[50vw] lg:h-[25vw]">
          {slideImages.map((image, index) => (
            <div key={index} className="relative h-[50vw] lg:h-[25vw]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${image.img})`,
                }}
              />
              <div className="absolute inset-0 bg-green-200 opacity-50"></div>
            </div>
          ))}
        </Slider> */}
        <div className="relative h-[50vw] lg:h-[25vw]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(/images/firstImage.jpg)`,
            }}
          />
          <div className="absolute inset-0 bg-green-200 opacity-50"></div>
        </div>
        <header className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-[2vw] lg:justify-between lg:p-[4vw]">
          <section>
            <Link to="/" className="w-full block">
              <figure className="w-full max-w-[20vw] shadow-md">
                <motion.img whileHover={{ scale: 1.2 }} src="/logo.png" alt="img" />
              </figure>
            </Link>
          </section>
          <section className="flex flex-col gap-[1vw] text-white text-center lg:text-left">
            <h1 className="text-[4vw] lg:text-[2vw] text-center font-bold">CALL US TODAY ON</h1>

            <figure className="flex flex-col gap-[1vw] mt-[2vw] lg:mt-[1vw]">
              <h1 className="text-[4vw] lg:text-[2.5vw] text-center font-bold">07xxxxxxxx</h1>
              <p className="font-bold text-purple-900 text-[1.2vw]">
                We deliver across West Yorkshire area
              </p>
              <figure className="w-full max-w-[50vw] lg:max-w-[17vw] lg:ml-[3vw] mt-[4vw] lg:mt-[1vw]">
                <img
                  src="https://www.funfactorleeds.co.uk/theme/email-address@1x.png"
                  alt="img"
                  className="w-full"
                />
              </figure>
            </figure>
          </section>
        </header>
      </div>
    </>
  );
};

export default TopHeader;
