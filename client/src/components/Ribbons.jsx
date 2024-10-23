// Sidebar.js
import React from 'react';
import { motion } from 'framer-motion';
import { ribbons } from '../data';

const Ribbons = ({ handleRibbonClick, getRibbonClasses }) => {
  return (
    <aside className="ml-[-1vw] flex flex-col mt-[1vw] gap-[1.5vw] sticky top-4">
      {ribbons?.map((elem, ind) => (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: (ind + 1) * 0.1 }}
          key={ind}
          onClick={() => handleRibbonClick(elem.title)}
          className={`${getRibbonClasses(elem.title)} bg-[#b694c8] p-[3vw] lg:p-2 rounded w-full lg:max-w-[20vw] max-w-[100vw]`} // Apply bg color here
        >
          <p className="transition-all duration-300  text-black ml-[2vw] font-ab font-bold text-[3vw] lg:text-[1.5vw]">
            {elem.title}
          </p>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: (ribbons.length + 1) * 0.1 }}
        onClick={() => handleRibbonClick("Other Products")}
        className={`${getRibbonClasses("Other Products")} bg-[#b694c8] lg:p-2 p-[3vw] rounded w-full lg:max-w-[20vw] max-w-[100vw]`} // Apply bg color here
      >
        <p className="transition-all duration-300 text-black ml-[2vw] font-ab font-bold text-[3vw] lg:text-[1.5vw]">
          Other Products
        </p>
      </motion.div>
    </aside>
  );
};

export default Ribbons;
