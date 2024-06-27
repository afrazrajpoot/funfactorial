import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { navData, submenuItems } from "../data";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header>
      <article>
        <section>
          <div className="bg-[#40327a] h-[10vh] w-full rounded-md"></div>
          <article className="bg-[#dd0042] p-[2vw] w-full max-w-[95vw] mt-[1vw] m-auto rounded-md flex justify-around">
            <figure className="w-full max-w-[23vw]">
              <img
                src="https://files.bookingonline.co.uk/image/upload/f_auto/themes/009/check-availability@1x.png"
                alt="img"
                className="w-full"
              />
            </figure>

            <form
              action=""
              className="flex gap-[3vw] ml-[5vw] w-full items-center"
            >
              <select
                name="delivery"
                className="bg-white p-[1vw] rounded-md w-full max-w-[15vw]"
              >
                <option value="Select delivery area">
                  Select delivery area
                </option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <div className="w-full max-w-[15vw]">
                <input
                  type="date"
                  name=""
                  className="rounded-md p-[1vw] w-full"
                />
              </div>
              <select
                name="delivery"
                className="bg-white p-[1vw] w-full max-w-[15vw] rounded-md"
              >
                <option value="Select delivery area">
                  Select delivery area
                </option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <div className="bg-[#40327a] p-[1vw] h-[7vh] w-full max-w-[10vw] rounded-md mt-[0.3vw]">
                <p className="text-white font-bold">Search</p>
              </div>
            </form>
          </article>
        </section>
      </article>
      <nav className="bg-custom-gradient flex gap-[3vw] shadow-lg mt-[1vw] p-[2vw] justify-center relative">
        {navData?.map((item, index) => (
          <div key={index} className="relative">
            <Link
              to={item.url}
              className="text-black font-bold hover:text-[#dd0042] hover:underline"
              onClick={index === 1 ? handleDropdownToggle : undefined}
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className="text-[1.3vw] text-white transition-all duration-300 hover:translate-x-3 hover:text-yellow-400 font-ab"
              >
                {item.title} {index === 1 && <ArrowDropDownIcon />}
              </motion.p>
            </Link>
            {index === 1 && dropdownOpen && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                ref={dropdownRef}
                className="absolute z-50 left-0 mt-2 bg-[#ff0056] w-[15vw] rounded-md shadow-lg"
              >
                {submenuItems.map((submenuItem, submenuIndex) => (
                  <Link
                    key={submenuIndex}
                    to={submenuItem.url}
                    className="block px-4 py-2 text-white hover:text-yellow-400 transition-all duration-300 hover:translate-y-[-0.1vw] font-ab font-bold text-center text-[1vw]"
                  >
                    {submenuItem.title}
                  </Link>
                ))}
              </motion.div>
            )}
          </div>
        ))}
      </nav>
    </header>
  );
};

export default Header;
