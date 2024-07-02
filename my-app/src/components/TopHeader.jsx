import React from "react";
import { motion } from "framer-motion";
const TopHeader = () => {
  let socialImages = [
    {
      img: "https://bouncycastlenetwork-res.cloudinary.com/f_auto/social/defaultbordered/google.png",
    },
    {
      img: "https://bouncycastlenetwork-res.cloudinary.com/f_auto/social/defaultbordered/facebook.png",
    },
  ];
  let imagesGroup = [
    {
      img: "https://bouncycastlenetwork-res.cloudinary.com/image/upload/bcn/biha-logo-200.png",
    },
    {
      img: "https://bouncycastlenetwork-res.cloudinary.com/image/upload/bcn/tipe-logo-200.png",
    },
    {
      img: "https://bouncycastlenetwork-res.cloudinary.com/image/upload/bcn/pipa-logo-200.png",
    },
    {
      img: "https://bouncycastlenetwork-res.cloudinary.com/image/upload/bcn/https-logo-200.png",
    },
  ];
  const imagesGroup2 = [
    {
      img: "https://www.funfactorleeds.co.uk/theme/phone-number-1@1x.png",
    },
    {
      img: "https://bouncycastlenetwork-res.cloudinary.com/c_scale,w_500,fl_png8/v1469464856/card-logos",
    },
    {
      img: "https://www.funfactorleeds.co.uk/theme/we-deliver@1x.png",
    },
  ];
  return (
    <>
      <header className="flex gap-[30vw] ml-[3.5vw] ">
        <section>
          <article>
            <figure>
              <motion.img
                whileHover={{ scale: 1.2 }}
                src="https://www.funfactorleeds.co.uk/theme/fun-factor-leeds@1x.png"
                alt="img"
              />
            </figure>
          </article>
          <article className="flex gap-[1vw] mt-[-3vw] w-full max-w-[3vw] ml-[6vw]">
            {socialImages.map((socialImage) => (
              <img src={socialImage.img} alt="google" className="w-full" />
            ))}
          </article>
          <article className="flex ml-[2vw] mt-[1vw]">
            <section className="flex items-center gap-[1vw]">
              {imagesGroup.map((imageGroup) => (
                <figure className="w-full max-w-[4vw]">
                  <img src={imageGroup.img} alt="google" className="" />
                </figure>
              ))}
            </section>
            <section className="ml-[3vw]">
              <figure>
                <img
                  src="https://files.bookingonline.co.uk/image/upload/f_auto/themes/009/header-bcn@1x.png"
                  alt="logo"
                />
              </figure>
            </section>
          </article>
        </section>
        <section className="flex flex-col gap-[1vw] mt-[2vw]">
          <h1 className="text-red-500 text-[2vw] font-bold text-center">
            CALL US TODAY ON
          </h1>

          <figure className="flex flex-col gap-[1vw]">
            {imagesGroup2.map((imageGroup2) => {
              return (
                <>
                  <figure className="flex justify-center ">
                    <img src={imageGroup2.img} alt="img" />
                  </figure>
                </>
              );
            })}
            <figure className="w-full max-w-[17vw] ml-[5.5vw]">
              <img
                src="https://www.funfactorleeds.co.uk/theme/email-address@1x.png"
                alt="img"
                className="w-full"
              />
            </figure>
          </figure>
        </section>
      </header>
    </>
  );
};

export default TopHeader;
