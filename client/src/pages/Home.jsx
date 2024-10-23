import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { CircularProgress } from '@mui/material';
import Card from "../components/Card";
import { products, ribbons } from "../data";
import Details from "../components/Details";
import { useInView } from "react-intersection-observer";
import { useGlobalState } from "../context/globalState";
import Ribbons from "../components/Ribbons";
import Loading from "../components/Loader";

const Home = () => {
  const { data, setData, search } = useGlobalState();
  const [popup, showPopup] = useState(false);
  const [activeRibbon, setActiveRibbon] = useState("All Products");
  const [isAnimating, setIsAnimating] = useState(false);
  const [showRibbons, setShowRibbons] = useState(false); // State to toggle ribbons
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

  const isProductInMainCategories = (product) => {
    const mainCategories = ribbons
      .filter(ribbon => ribbon.title !== "All Products")
      .map(ribbon => ribbon.title.toLowerCase());
    
    const productTitle = product.title.toLowerCase();
    const productDescription = (product.description || '').toLowerCase();
    
    return mainCategories.some(category => 
      productTitle.includes(category.split(' ')[0]) || 
      productDescription.includes(category.split(' ')[0])
    );
  };

  const isAdultContent = (product) => {
    const adultKeywords = ['Adult', 'Mermaid'];
    return adultKeywords.some(keyword => 
      product.title.toLowerCase().includes(keyword.toLowerCase()) || 
      (product.description || '').toLowerCase().includes(keyword.toLowerCase())
    );
  };

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
      filteredProducts = productsWithIds;
    } else {
      const ribbonWords = ribbonTitle.toLowerCase().split(" ");
      filteredProducts = productsWithIds.filter((item) => {
        const productTitle = item.title.toLowerCase();
        return ribbonWords.some((word) => productTitle.includes(word));
      });
    }
  
    // Limit the results to the last 30 products
    filteredProducts = filteredProducts.slice(-30); 
  
    setData([]); 
    setTimeout(() => {
      setData(filteredProducts);
      setIsAnimating(false);
    }, 300);
  };
  

  const getRibbonClasses = (ribbonTitle) => {
    const baseClasses = "relative w-[23vw] p-[1vw] rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-pink-300/50 hover:-translate-y-1 cursor-pointer";
    const activeClasses = activeRibbon === ribbonTitle 
      ? "bg-[#b694c8] ring-2 ring-pink-400" 
      : "bg-[#b694c8]";
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

  const ribbonVariants = {
    hidden: { x: "-100%" },
    visible: { 
      x: "0%",
      transition: { type: "spring", stiffness: 100 }
    },
    exit: { x: "-100%", transition: { duration: 0.3 } }
  };

  return (
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

        <button
          onClick={() => setShowRibbons(!showRibbons)}
          className="lg:hidden mt-4 p-2 ml-[2vw] bg-pink-500 text-white rounded-md"
        >
          Categories
        </button>

        <AnimatePresence>
          {showRibbons && (
            <motion.section
              key="mobile-ribbons"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={ribbonVariants}
              className="lg:hidden mt-4 p-4 bg-white shadow-md"
            >
              <Ribbons handleRibbonClick={handleRibbonClick} getRibbonClasses={getRibbonClasses} />
            </motion.section>
          )}
        </AnimatePresence>

        <div className="mt-16 pt-[9vw]" ref={productsRef}>
          <section className="flex flex-col lg:flex-row gap-8">
            <section className="lg:w-1/4 hidden lg:block">
              <Ribbons handleRibbonClick={handleRibbonClick} getRibbonClasses={getRibbonClasses} />
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
      {data.map((elem, ind) => (
        <motion.div key={elem.id} variants={itemVariants} layout>
          <Card {...elem} ind={ind} />
        </motion.div>
      ))}
    </motion.div>
  ) : !isAnimating && data.length === 0 ? (
    <motion.div
      key="no-products"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{marginTop: "5vw"}}
      className="flex justify-center items-center mt-4 text-lg font-semibold text-gray-500"
    >
      No Products Found
    </motion.div>
  ) : (
    <Loading />
    // <motion.div
    //   key="loading-spinner"
    //   className="flex justify-center items-center mt-[20vw]"
    //   style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20vw" }}
    // >
    //   <CircularProgress />
    // </motion.div>
  )}
</AnimatePresence>

            </article>
          </section>
        </div>
      </section>
    </main>
  );
};

export default Home;
