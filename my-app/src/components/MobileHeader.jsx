import React, { useState } from "react";
import { navData } from "../data";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "../index.css"; // Import the index.css file

const MobileHeader = () => {
  const [showNav, setShowNav] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const navVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: "auto", opacity: 1 },
  };

  const submenuVariants = {
    hidden: { height: 0, opacity: 0, overflow: "hidden" },
    visible: { height: "auto", opacity: 1, overflow: "hidden" },
  };

  const toggleSubmenu = (index) => {
    if (activeSubmenu === index) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(index);
    }
  };

  return (
    <main className="header-container">
      <div className="header" onClick={() => setShowNav(!showNav)}>
        <div className="header-text">My App</div>
        <div className="header-text cursor-pointer">{showNav ? "Cancel" : "Menu"}</div>
      </div>
      <AnimatePresence>
        {showNav && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={navVariants}
            transition={{ duration: 0.5 }}
            className="nav-container"
          >
            <div className="nav-content">
              {navData?.map((elem, ind) => (
                <div key={ind}>
                  <div className="flex justify-between items-center">
                    <Link to={elem.url} onClick={() => setShowNav(false)}>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: ind * 0.1 }}
                        className="nav-item"
                      >
                        {elem.title}
                      </motion.p>
                    </Link>
                    {elem.submenu && (
                      <div className="text-white cursor-pointer" onClick={() => toggleSubmenu(ind)}>
                        {activeSubmenu === ind ? "-" : "+"}
                      </div>
                    )}
                  </div>
                  <AnimatePresence>
                    {elem.submenu && activeSubmenu === ind && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={submenuVariants}
                        transition={{ duration: 0.5 }}
                        className="submenu scrollbar-custom"
                      >
                        {elem.submenu.map((subElem, subInd) => (
                          <Link to={subElem.url} key={subInd} onClick={() => setShowNav(false)}>
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: subInd * 0.1 }}
                              className="nav-item"
                            >
                              {subElem.title}
                            </motion.p>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default MobileHeader;
