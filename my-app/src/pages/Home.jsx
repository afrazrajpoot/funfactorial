import React, { useEffect } from "react";
import Slider from "react-slick";
import Card from "../components/Card";
import { cardData, cardImages, slideImages } from "../data";
import Details from "../components/Details";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useGlobalState } from "../context/globalState";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import Ribbons from "../components/Ribbons";

const Home = () => {
  const { data, setData, search } = useGlobalState();
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const CustomArrow = ({ direction, onClick }) => {
    const Icon = direction === "next" ? FaChevronRight : FaChevronLeft;
    return (
      <button
        onClick={onClick}
        className={`absolute top-1/2 transform -translate-y-1/2 ${
          direction === "next" ? "right-4" : "left-4"
        } z-10 bg-white bg-opacity-50 rounded-full p-3 hover:bg-opacity-75 transition-all duration-200`}
      >
        <Icon className="text-3xl text-gray-800" />
      </button>
    );
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
  };

  // const cardSliderSettings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   nextArrow: <CustomArrow direction="next" />,
  //   prevArrow: <CustomArrow direction="prev" />,
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 640,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //       },
  //     },
  //   ],
  // };

  useEffect(() => {
    setData(cardData);
    if (search) {
      setData(
        cardData.filter((item) => item.title[0].toLowerCase().includes(search.toLowerCase()))
      );
    }
  }, [search]);

  return (
    <main className="min-h-screen">
      <section className="w-full mx-auto px-4 py-8">
        <div className="mb-16">
          <Slider {...sliderSettings}>
            {slideImages?.map((image, index) => (
              <div key={index} className="relative h-[60vh] md:h-[80vh] lg:h-[90vh]">
                <img
                  src={image.img}
                  alt="slide image"
                  className="w-full h-full object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0  to-transparent flex items-center">
                  <div className="ml-8 md:ml-16 max-w-lg">
                    <h2 className="text-white text-3xl md:text-5xl font-bold mb-4">
                      {image.title}
                    </h2>
                    <p className="text-gray-200 text-lg md:text-xl mb-6">{image.description}</p>
                    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105">
                      Explore Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <Details />

        <div className="mt-16  pr-[5vw]">
          <div className="relative mb-12"></div>
          <section className="flex gap-[3vw]">
            <section className="mt-4 hidden lg:block lg:w-[28vw] ">
              <Ribbons />
            </section>
            <article className="">
              <article className="grid grid-cols-4 gap-x-[6vw]">
                {data?.map((elem, ind) => (
                  <Card key={ind} {...elem} ind={ind} />
                ))}
              </article>
            </article>
          </section>
        </div>
      </section>
    </main>
  );
};

export default Home;
