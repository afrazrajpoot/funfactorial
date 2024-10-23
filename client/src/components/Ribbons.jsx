import React from 'react';
import { motion } from 'framer-motion';

const Ribbons = ({ activeRibbon, handleRibbonClick, ribbons }) => {
  const getRibbonClasses = (ribbonTitle) => {
    const baseClasses = "relative w-[23vw] p-[1vw] rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-pink-300/50 hover:-translate-y-1 cursor-pointer";
    const activeClasses = activeRibbon === ribbonTitle 
      ? "bg-[#d44a8a] ring-2 ring-pink-400" 
      : "bg-[#f06eaa]";
    return `${baseClasses} ${activeClasses}`;
  };

  return (
    <section className="lg:w-1/4 hidden lg:block">
      <aside className="ml-[-1vw] flex flex-col mt-[1vw] gap-[1.5vw] sticky top-4">
        {ribbons?.map((elem, ind) => (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: (ind + 1) * 0.1 }}
            key={ind}
            onClick={() => handleRibbonClick(elem.title)}
            className={getRibbonClasses(elem.title)}
          >
            <p className="transition-all duration-300 text-black ml-[2vw] font-ab font-bold text-[1.5vw]">
              {elem.title}
            </p>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: (ribbons.length + 1) * 0.1 }}
          onClick={() => handleRibbonClick("Other Products")}
          className={getRibbonClasses("Other Products")}
        >
          <p className="transition-all duration-300 text-black ml-[2vw] font-ab font-bold text-[1.5vw]">
            Other Products
          </p>
        </motion.div>
      </aside>
    </section>
  );
};

export default Ribbons;