"use client"; // If using Next.js 13 with app directory

import React, { useEffect, useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/app/data";
// import Card from "@/components/Card";
// import Loading from "@/components/Loader";
// import Header from "@/components/Header";
import { useSearchParams } from "next/navigation"; // Correct hook for query parameters
import dynamic from "next/dynamic";
const Card = dynamic(() => import("@/components/Card"), { ssr: false });
const Header = dynamic(() => import("@/components/Header"), { ssr: false });
const Loading = dynamic(() => import("@/components/Loader"), { ssr: false });
const SearchProductsContent = () => {
  const searchParams = useSearchParams(); // Use useSearchParams for query params
  const searchQuery = searchParams.get("search") || ""; // Get the "search" query parameter
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Animation variants
  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  useEffect(() => {
    const searchProducts = async () => {
      setIsLoading(true);

      // Add IDs to products if they don't exist
      const productsWithIds = products && products.length > 0 && products.map((product, index) => ({
        ...product,
        id: product.id || `product-${index}`,
      }));

      let filteredProducts = [];

      if (!searchQuery) {
        // If no query, show all products (limited to 30)
        filteredProducts = productsWithIds.slice(-30);
      } else {
        const searchWords = searchQuery.toLowerCase().split(" ");

        filteredProducts = productsWithIds.filter((item) => {
          const productTitle = (item.title || "").toLowerCase();

          // Check if any search word is included in title
          return searchWords.some((word) => productTitle.includes(word));
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
  }, [searchQuery]); 

  return (
  <>
  <Header />
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
  </>
  );
};

const SearchProducts = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SearchProductsContent />
    </Suspense>
  );
};

export default SearchProducts;