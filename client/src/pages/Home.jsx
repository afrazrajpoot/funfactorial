import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import Card from "../components/Card";
import { cardData, products, ribbons } from "../data";
import Details from "../components/Details";
import { useInView } from "react-intersection-observer";
import { useGlobalState } from "../context/globalState";
import Popup from "../components/Popup";
import Ribbons from "../components/Ribbons.jsx"
const Home = () => {
  const { data, setData, search } = useGlobalState();
  const [popup, showPopup] = useState(false);
  const [activeRibbon, setActiveRibbon] = useState("All Products");
  const [isAnimating, setIsAnimating] = useState(false);
  const productsRef = useRef(null);
  
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

  const scrollToProducts = () => {
    if (productsRef.current) {
      productsRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    const productsWithIds = products.map((product, index) => ({
      ...product,
      id: product.id || `product-${index}`
    }));
    setData(productsWithIds);
  }, []);

  useEffect(() => {
    if (search) {
      setIsAnimating(true);
      const searchWords = search.toLowerCase().split(" ");
      const filteredData = products
        .map((product, index) => ({
          ...product,
          id: product.id || `product-${index}`
        }))
        .filter((item) =>
          searchWords.some((word) =>
            item.title.toLowerCase().includes(word)
          )
        );
      
      setTimeout(() => {
        setData(filteredData);
        setActiveRibbon("");
        scrollToProducts();
        setIsAnimating(false);
      }, 300);
    }
  }, [search]);

  useEffect(() => {
    showPopup(true);
    const timeout = setTimeout(() => {
      showPopup(false);
    }, 4000);
    return () => clearTimeout(timeout);
  }, []);

  const handleRibbonClick = async (ribbonTitle) => {
    setIsAnimating(true);
    setActiveRibbon(ribbonTitle);
    scrollToProducts();
  
    let filteredProducts = [];
    const productsWithIds = products.map((product, index) => ({
      ...product,
      id: product.id || `product-${index}`
    }));
  
    if (ribbonTitle === "All Products") {
      filteredProducts = productsWithIds;
    } else if (ribbonTitle === "Other Products") {
      // Simply take the last 20 products
      filteredProducts = productsWithIds.slice(-20);
    } else {
      const ribbonWords = ribbonTitle.toLowerCase().split(" ");
      filteredProducts = productsWithIds.filter((item) => {
        const productTitle = item.title.toLowerCase();
        const productDescription = (item.description || '').toLowerCase();
        return ribbonWords.some((word) => 
          productTitle.includes(word) || productDescription.includes(word)
        );
      });
    }
  
    setData([]); 
  
    setTimeout(() => {
      setData(filteredProducts);
      setIsAnimating(false);
    }, 300);
  };

  const getRibbonClasses = (ribbonTitle) => {
    const baseClasses = "relative w-[23vw] p-[1vw] rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-pink-300/50 hover:-translate-y-1 cursor-pointer";
    const activeClasses = activeRibbon === ribbonTitle 
      ? "bg-[#d44a8a] ring-2 ring-pink-400" 
      : "bg-[#f06eaa]";
    return `${baseClasses} ${activeClasses}`;
  };

  const containerVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <>
      {popup && <Popup />}
      <main className="min-h-screen pb-[5vw]">
        <section>
          <section className="grid grid-cols-1 mt-[3vw] lg:grid-cols-2 gap-[10vw]">
            <article className="w-full">
              <Details />
            </article>
            <article>
              <div className="grid grid-cols-2 gap-2 pr-[2vw]">
                {images.map((img, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
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
                  </motion.div>
                ))}
              </div>
            </article>
          </section>

          <div className="mt-16 pt-[9vw]" ref={productsRef}>
            <section className="flex flex-col lg:flex-row gap-8">
              <section className="lg:w-1/4 hidden lg:block">
              <Ribbons 
                activeRibbon={activeRibbon}
                handleRibbonClick={handleRibbonClick}
                ribbons={ribbons}
              />
              </section>
            
              <article className="lg:w-3/4">
                <AnimatePresence mode="wait">
                  {!isAnimating && data && data.length > 0 ? (
                    <motion.div
                      key="product-grid"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                    >
                      {data?.map((elem) => (
                        <motion.div
                          key={elem.id}
                          variants={itemVariants}
                          layout
                        >
                          <Card {...elem} />
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="no-products"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center h-[200px] w-full"
                    >
                      <p className="text-2xl text-gray-500 font-semibold">
                        {isAnimating ? "Loading..." : "No products found"}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            </section>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;