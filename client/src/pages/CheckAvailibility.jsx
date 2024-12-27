import React, { useEffect } from 'react';
import { useGlobalState } from '../context/globalState';
import { products } from '../data';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import Layout from '../components/Layout';
import Header from '../components/Header';

const CheckAvailibility = () => {
  const { availableData, data, setData, search } = useGlobalState();

  // Check if availableData exists and has items
  const unavailableTitles = availableData?.length > 0 
    ? availableData.map(item => item.itemDetail.name)
    : [];

  // Filter the products based on unavailable titles
  const filteredProducts = unavailableTitles.length === 0 
    ? products 
    : products.filter(product => !unavailableTitles.includes(product.title));

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

  // Update the data when the search changes or when the component is mounted
  useEffect(() => {
    const filteredBySearch = search
      ? filteredProducts.filter((item) =>
          item.title[0].toLowerCase().includes(search.toLowerCase())
        )
      : filteredProducts;

    // Set the data state with the filtered products
    setData(filteredBySearch);
  }, [search, availableData, setData]);

  return (
    <>
    <Header />
      <div className="grid grid-cols-1 ml-[1vw] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {data.map((elem, ind) => (
          <motion.div key={elem.id} variants={itemVariants} layout>
            <Card {...elem} ind={ind} />
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default CheckAvailibility;
