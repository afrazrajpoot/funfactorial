import React from 'react';
import { motion } from 'framer-motion';
import { ribbons } from '../data';

const Ribbons = ({ handleRibbonClick, getRibbonClasses }) => {
  return (
    <aside className="ml-[-1vw] flex flex-col mt-4 gap-4 sticky top-4 max-w-xs">
      {ribbons?.map((elem, ind) => (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: (ind + 1) * 0.1 }}
          key={ind}
          onClick={() => handleRibbonClick(elem.title)}
          className={`
            ${getRibbonClasses(elem.title)} 
            bg-purple-300 
            hover:bg-purple-400 
            transition-all 
            duration-300 
            ease-in-out 
            shadow-md 
            hover:shadow-lg 
            transform 
            hover:-translate-y-1 
            p-4 
            rounded-lg 
            cursor-pointer 
            flex 
            items-center 
            w-full
          `}
        >
          <p className="text-white font-bold text-lg tracking-wide ml-4">
            {elem.title}
          </p>
        </motion.div>
      ))}
      
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: (ribbons.length + 1) * 0.1 }}
        onClick={() => handleRibbonClick("Other Products")}
        className={`
          ${getRibbonClasses("Other Products")} 
          bg-purple-300 
          hover:bg-purple-400 
          transition-all 
          duration-300 
          ease-in-out 
          shadow-md 
          hover:shadow-lg 
          transform 
          hover:-translate-y-1 
          p-4 
          rounded-lg 
          cursor-pointer 
          flex 
          items-center 
          w-full
        `}
      >
        <p className="text-white font-bold text-lg tracking-wide ml-4">
          Other Products
        </p>
      </motion.div>
    </aside>
  );
};

export default Ribbons;