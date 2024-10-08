import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { cardData, products } from "../data";
import Details from "../components/Details";
import { useInView } from "react-intersection-observer";
import { useGlobalState } from "../context/globalState";
import Ribbons from "../components/Ribbons";
import Popup from "../components/Popup";

const Home = () => {
  const { data, setData, search } = useGlobalState();
  const [popup, showPopup] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const images = [
    "/images/img2.jpg",
    "/images/zorbBalls.jpg",
    "/images/IMG-20240815-WA0014.jpg",
    "/images/img4.jpg",
  ];

  useEffect(() => {
    setData(cardData);
    if (search) {
      setData(
        cardData.filter((item) =>
          item.title[0].toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search]);

  // Trigger popup when the component is mounted
  useEffect(() => {
    showPopup(true);
    const timeout = setTimeout(() => {
      showPopup(false);
    }, 4000);

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {popup && <Popup />} {/* Conditional rendering for popup */}
      <main className="min-h-screen">
        <section>
          <section className="grid grid-cols-1 mt-[3vw] lg:grid-cols-2 gap-[10vw]">
            <article className="w-full">
              <Details />
            </article>
            <article>
              <div className="grid grid-cols-2 gap-2 pr-[2vw]">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="relative overflow-hidden rounded-lg shadow-lg aspect-square group"
                  >
                    <img
                      src={img}
                      alt={`Image ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        View Image
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <div className="mt-16">
            <section className="flex flex-col lg:flex-row gap-8">
              <section className="lg:w-1/4 hidden lg:block">
                <Ribbons />
              </section>
              <article className="lg:w-3/4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                  {products?.map((elem, ind) => (
                    <Card key={ind} {...elem} ind={ind} />
                  ))}
                </div>
              </article>
            </section>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
