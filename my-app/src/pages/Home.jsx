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
  const { data, setData } = useGlobalState();
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

  const cardSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    setData(cardData);
  }, []);

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

        <div className="mb-16" ref={ref}>
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
            <span className="inline-block mr-2">
              <FaStar className="text-yellow-400" />
            </span>
            Featured Products
          </h2>
          <Slider {...cardSliderSettings}>
            {cardImages?.map((image, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0, y: 50 },
                }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="px-3"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105 group">
                  <img src={image.img} alt={image.title} className="w-full h-72 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div>
                      <h3 className="text-white text-2xl font-bold mb-2">{image.title}</h3>
                      <p className="text-gray-300">{image.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </Slider>
        </div>

        <Details />

        <div className="mt-16">
          <div className="relative mb-12">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-32 rounded-2xl shadow-lg"></div>
            <h2 className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white">
              Discover Our Amazing Products
            </h2>
          </div>
          <section className="flex gap-1">
            <section className="mt-4 hidden lg:block lg:w-[25vw]">
              <Ribbons />
            </section>
            <article className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {data?.map((elem, ind) => (
                <Card key={ind} {...elem} ind={ind} />
              ))}
            </article>
          </section>
        </div>
      </section>
    </main>
  );
};

export default Home;
