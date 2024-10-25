import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import { products } from '../data';
import { useGlobalState } from '../context/globalState';
import Layout from '../components/Layout';


const AllProducts = () => {
  const { data, setData, search } = useGlobalState();

  useEffect(() => {
    setData(products);
    if (search) {
      setData(
        products.filter((item) =>
          item.title[0].toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, setData]);

  return (
<Layout>
<section className='flex gap-[2vw]'>
   
   <motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.5 }}
className="container mx-auto px-4 py-8"
>
<h1 className="text-3xl font-bold text-center mb-8">All Products</h1>
<motion.div 
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }}
  initial="hidden"
  animate="show"
>
  {data?.map((elem, ind) => (
    <motion.div
      key={ind}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
    >
      <Card {...elem} ind={ind} />
    </motion.div>
  ))}
</motion.div>
</motion.div>
</section>
</Layout>
  );
};

export default AllProducts;