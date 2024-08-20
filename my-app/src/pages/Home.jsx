import React, { useEffect } from "react";
import Slider from "react-slick";
import { bgImageCard } from "../assets/bg";
import Card from "../components/Card";
import { cardData, cardImages, ribbons, slideImages } from "../data";
import Details from "../components/Details";
import Ribbons from "../components/Ribbons";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useGlobalState } from "../context/globalState";
const Home = () => {
  const { data, setData } = useGlobalState();
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  const textShadowStyle = {
    textShadow:
      "0 0 0 #000, -1px -1px 0 #000, 0 -1px 0 #000, 1px -1px 0 #000, 1px 0 0 #000, 1px 1px 0 #000, 0 1px 0 #000, -1px 1px 0 #000, -1px 0 0 #000",
    color: "#fff", // Setting text color to white for contrast
  };
  const { ref, inView } = useInView({
    triggerOnce: false, // Trigger animation only once
    threshold: 0.5, // Percentage of element in view to trigger animation
  });
  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 50 },
  };
  useEffect(() => {
    setData(cardData);
  }, [data]);
  return (
    <main className="">
      <section className="grid grid-cols-7 mt-[1vw] gap-[1vw]">
        {/* <aside className="lg:flex hidden flex-col gap-[1vw] col-span-2">
          <figure className="w-full ">
            <img src="/images/sideHome.jpg" alt="aside image" className="h-[64vh]" />
          </figure>
          <figure className="w-full">
            <img
              src="https://files.bookingonline.co.uk/image/upload/f_auto/themes/009/weather-background.jpg"
              alt="aside image"
              className="w-[26vw]"
            />
          </figure>
        </aside> */}
        <section className="  col-span-12 hidden lg:block">
          <Slider {...settings}>
            {slideImages?.map((image, index) => {
              return (
                <div key={index} className="w-full h-[87vh]">
                  <img src={image.img} alt="slide image" className="w-full" />
                </div>
              );
            })}
          </Slider>
        </section>
      </section>

      <section className="grid grid-cols-12   gap-[2vw] mt-[2vw]">
        <article className="col-span-3 hidden lg:block">
          <Ribbons />
        </article>
        <section className="col-span-9 ">
          <motion.article className="lg:flex gap-[2vw] hidden  relative" ref={ref}>
            {cardImages?.map((image, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={variants}
                transition={{ duration: 0.6 }}
                className="flex flex-col justify-center"
                style={{ position: "relative" }}
              >
                <figure className={`w-[16.5vw]`}>
                  <img src={image.img} alt="slide image" className={`w-full`} />
                </figure>
                <figure className="w-[16.5vw] absolute top-[14vw]">
                  <img src={bgImageCard} alt="bgimage" className="w-full" />
                  <p
                    style={textShadowStyle}
                    className="translate-y-[-2.5vw] font-playwrite text-white text-center font-bold text-[1vw]"
                  >
                    {image.title}
                  </p>
                </figure>
              </motion.div>
            ))}
          </motion.article>
          <article className="flex items-center mt-[4vw]">
            <Details />
          </article>
          <article className=" mt-[4vw] lg:mt-[1vw]">
            <figure className="w-[100vw]  lg:w-full lg:max-w-[75vw]">
              <img
                className="lg:h-[5vw] h-[14vw]"
                src="https://files.bookingonline.co.uk/image/upload/f_auto/themes/009/category-title-background.png"
                alt="img"
              />
            </figure>
            <figure className="lg:translate-y-[-4vw] translate-y-[-10vw] translate-x-[15vw]  lg:translate-x-[5vw] w-[70vw] lg:w-full lg:max-w-[30vw]">
              <img
                src="https://files.bookingonline.co.uk/image/upload/f_auto/themes/009/check-out-some-of-our-products.png"
                className="w-full"
                alt="img"
              />
            </figure>
            <section className="lg:grid   lg:grid-cols-4 lg:gap-[3vw] pr-[3vw] flex flex-col gap-[9vw]">
              {data?.map((elem, ind) => (
                <Card key={ind} {...elem} w="16.5" ind={ind} ml={"4vw"} />
              ))}
            </section>
          </article>
        </section>
      </section>
    </main>
  );
};

export default Home;
