import React from "react";
import { ribbons } from "../data";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Ribbons = () => {
  return (
    <aside className="ml-[-1vw] flex flex-col mt-[1vw] gap-[1.5vw]">
      {ribbons?.map((elem, ind) => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: ind * 0.3 }}
          key={ind}
          className="relative bg-[#f06eaa] w-[23vw] p-[1vw] rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-pink-300/50 hover:-translate-y-1"
        >
          <Link to={elem.url}>
            <p className="  transition-all duration-300  text-black ml-[2vw] font-ab font-bold text-[1.5vw]">
              {elem.title}
            </p>
          </Link>
        </motion.div>
      ))}
    </aside>
  );
};

export default Ribbons;
