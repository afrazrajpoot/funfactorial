import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data';
import Card from '../components/Card';
import Loading from '../components/Loader';
import Layout from '../components/Layout';

const SearchProducts = () => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Animation variants
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
    }
  };

  useEffect(() => {
    const searchProducts = async () => {
      setIsLoading(true);
      const params = new URLSearchParams(location.search);
      const query = params.get('search');
      setSearchQuery(query);

      // Add IDs to products if they don't exist
      const productsWithIds = products.map((product, index) => ({
        ...product,
        id: product.id || `product-${index}`
      }));

      let filteredProducts = [];
      
      if (!query) {
        // If no query, show all products (limited to 30)
        filteredProducts = productsWithIds.slice(-30);
      } else {
        const searchWords = query.toLowerCase().split(" ");
        
        filteredProducts = productsWithIds.filter((item) => {
          const productTitle = (item.title || '').toLowerCase();
          // const productDescription = (item.description || '').toLowerCase();
          
          // Check if any search word is included in title or description
          return searchWords.some((word) => 
            productTitle.includes(word) 
            // productDescription.includes(word)
          );
        });
      }

      // Clear current results and set new ones with animation delay
      setSearchResults([]);
      setTimeout(() => {
        setSearchResults(filteredProducts);
        setIsLoading(false);
      }, 300);
    };

    searchProducts();
  }, [location.search]);

  return (
  <Layout>
      <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Search Results for: "{searchQuery}"
        </h1>

        <AnimatePresence mode="wait">
          {!isLoading ? (
            searchResults.length > 0 ? (
              <motion.div
                key="search-results"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {searchResults.map((product, index) => (
                  <motion.div
                    key={product.id}
                    variants={itemVariants}
                    className="h-full"
                  >
                    <Card {...product} ind={index} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <p className="text-xl text-gray-600">
                  No products found for "{searchQuery}"
                </p>
                <p className="text-gray-500 mt-2">
                  Try using different keywords or browsing our categories
                </p>
              </motion.div>
            )
          ) : (
            <Loading />
          )}
        </AnimatePresence>
      </div>
    </div>
  </Layout>
  );
};

export default SearchProducts;