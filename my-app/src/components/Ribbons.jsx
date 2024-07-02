import React from "react";
import { ribbons } from "../data";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const Ribbons = () => {
  const variant = {};
  return (
    <>
      <aside className="ml-[-1vw] flex flex-col mt-[2vw]">
        {ribbons?.map((elem, ind) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: ind * 0.3 }}
            key={ind}
            className="relative "
          >
            <Link to={elem.url}>
              <figure className="w-full max-w-[25vw] mt-[-2vw] ">
                <img src={elem.img} alt="slide image" className="w-full" />
              </figure>
              <p className="transition-all duration-300 hover:translate-x-[1vw] translate-y-[-4.8vw] text-white  ml-[2vw] font-ab   font-bold text-[1.5vw]">
                {elem.title}
              </p>
            </Link>
          </motion.div>
        ))}
        <article className="ml-[2vw]">
          <div className="bg-[#d50039] p-[3vw] mt-[2vw] rounded-md">
            <figure>
              <img
                src="https://files.bookingonline.co.uk/image/upload/f_auto/themes/009/join-our-newsletter.png"
                alt="msg"
              />
            </figure>
            <form action="" className="flex gap-[1vw] mt-[1vw]">
              <div className="">
                <input
                  type="text"
                  placeholder="Email Address"
                  className="w-[15vw] p-[0.5vw]"
                  name=""
                  id=""
                />
              </div>
              <div className="">
                <input
                  type="submit"
                  className="bg-black text-white p-[0.5vw] absolute left-[15.5vw]"
                  name=""
                  id=""
                />
              </div>
            </form>
          </div>
          <div className="border-[1px] border-b-black mt-[1vw]"></div>
        </article>
      </aside>
    </>
  );
};

export default Ribbons;
