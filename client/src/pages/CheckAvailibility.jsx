import React from 'react';
import { useGlobalState } from '../context/globalState';
import { products } from '../data';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import Layout from '../components/Layout';

const CheckAvailibility = () => {
  const { availableData } = useGlobalState();

  // Check if availableData exists and has items
  const unavailableTitles = availableData?.length > 0 
    ? availableData.map(item => item.itemDetail.name)
    : [];

  // If availableData is empty or undefined, show all products; otherwise, filter based on unavailableTitles
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

  return (
    <Layout>
      <div className="grid grid-cols-1  ml-[5vw] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {filteredProducts.map((elem, ind) => (
          <motion.div key={elem.id} variants={itemVariants} layout>
            <Card {...elem} ind={ind} />
          </motion.div>
        ))}
      </div>
    </Layout>
  );
};

export default CheckAvailibility;
