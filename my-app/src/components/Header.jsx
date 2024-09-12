import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { navData, submenuItems } from "../data";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { FormControl, InputLabel, MenuItem, Select, TextField, Button } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { useGlobalState } from "../context/globalState";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [deliveryArea, setDeliveryArea] = useState("");
  const [firstDate, setFirstDate] = useState("");
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { search, setSearch } = useGlobalState();
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    // Close the dropdown only if the click is outside both the dropdown and the toggle button
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setDropdownOpen(false);
    }
  };

  const handleDeliveryChange = (event) => {
    setDeliveryArea(event.target.value);
  };

  const handleClickFirstDate = (event) => {
    setFirstDate(event.target.value);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);

    // Generate suggestions based on the search term
    if (searchTerm.length > 0) {
      // This is a mock suggestion list. In a real application, you'd fetch this from your backend or a predefined list.
      const mockSuggestions = [
        "Bouncy Castle",
        "Soft Play",
        "Disco Dome",
        "Inflatable Slide",
        "Party Package",
      ].filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()));

      setSuggestions(mockSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion);
    setShowSuggestions(false);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const selectOptions = [
    [
      "BD11",
      "HD8",
      "LS1",
      "LS2",
      "LS3",
      "LS4",
      "LS5",
      "LS6",
      "LS7",
      "LS8",
      "LS9",
      "LS10",
      "LS11",
      "LS12",
      "LS13",
      "LS14",
      "LS15",
      "LS16",
      "LS17",
      "LS18",
      "LS19",
      "LS20",
      "WF1",
      "WF2",
      "WF3",
      "WF4",
      "WF5",
      "WF6",
      "WF7",
      "WF8",
      "WF9",
      "WF10",
    ],
    [
      "New For 2024 ",
      "Indoor Soft Play Packages",
      "Christmas Inflatable",
      "Bouncy Castles",
      "Disco Domes",
      "Assault Course",
      "Bouncy & Slides Combos",
      "ADULT CASTLES",
      "Soft Play",
      "Party Add-ons",
      "Inflatable Games",
      "Generator Hire Section",
    ],
  ];

  return (
    <header>
      <article>
        <section>
          <article className="bg-[#f3e4c5] mt-[4vw] p-[2vw] w-full max-w-[95vw] lg:mt-[1vw] m-auto rounded-md flex lg:justify-around lg:flex-row flex-col lg:gap-[0vw] gap-[4vw]">
            <figure className="w-full max-w-[50vw] ml-[20vw] lg:ml-[0vw] lg:max-w-[23vw]">
              <img
                src="https://files.bookingonline.co.uk/image/upload/f_auto/themes/009/check-availability@1x.png"
                alt="img"
                className="w-full"
              />
            </figure>

            <form
              action=""
              className="flex lg:flex-row flex-col gap-[3vw] lg:ml-[5vw] w-full items-center"
            >
              <FormControl className="w-full lg:max-w-[15vw]">
                <InputLabel shrink={false}>{!deliveryArea && "Set delivery area"}</InputLabel>
                <Select
                  value={deliveryArea}
                  onChange={handleDeliveryChange}
                  className="bg-white rounded-md w-full"
                >
                  {selectOptions[0].map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                type="date"
                margin="dense"
                InputLabelProps={{ shrink: true }}
                className="rounded-md w-full lg:max-w-[15vw] bg-white"
              />
              <FormControl className="w-full lg:max-w-[15vw]">
                <InputLabel shrink={false}>{!firstDate && "Select Date First"}</InputLabel>

                <Select
                  value={firstDate}
                  onChange={handleClickFirstDate}
                  className="bg-white rounded-md w-full"
                >
                  {selectOptions[1].map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                className="bg-[#40327a] lg:p-[1vw] h-[7vh] w-full lg:max-w-[10vw] rounded-md mt-[0.3vw]"
                style={{ backgroundColor: "#40327a", color: "white", fontWeight: "bold" }}
              >
                Search
              </Button>
            </form>
          </article>
        </section>
      </article>
      <nav
        className={`bg-[#f3e4c5] hidden lg:flex gap-[3vw] shadow-lg p-[2vw] justify-center mt-[1vw] ${
          scrollPosition > 500 && "mt-[-1.1px] opacity-90"
        } transition-all duration-300 ${
          scrollPosition > 500 ? "sticky left-0 top-0 w-full z-50" : ""
        } `}
        style={{ position: scrollPosition > 500 ? "fixed" : "relative" }}
      >
        {navData?.map((item, index) => (
          <div key={index} className="relative flex gap-[1vw]">
            <Link
              to={item.url}
              className="text-black font-bold  items-center hover:text-[#dd0042] hover:underline"
              ref={index === 1 ? buttonRef : null}
              onClick={index === 1 ? handleDropdownToggle : undefined}
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className="text-[1.3vw] text-black transition-all duration-300 hover:translate-x-3 hover:text-[#f06eaa] font-ab"
              >
                {item.title} {index === 1 && <ArrowDropDownIcon />}
              </motion.p>
            </Link>
            {index === 1 && dropdownOpen && (
              <motion.div
                initial={{ height: 0.5, opacity: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.5 }}
                ref={dropdownRef}
                className="absolute z-50 left-0 mt-[3vw] bg-white w-[15vw] rounded-md shadow-lg"
              >
                {submenuItems.map((submenuItem, submenuIndex) => (
                  <Link
                    key={submenuIndex}
                    to={submenuItem?.url}
                    className="block px-4 py-2  text-[black] hover:text-[#f06eaa] transition-all duration-300 hover:translate-y-[-0.1vw] font-ab font-bold text-center text-[1vw]"
                  >
                    {submenuItem.title}
                  </Link>
                ))}
              </motion.div>
            )}
            <div>
              {index === 4 && (
                <div className="flex translate-x-[20vw] items-center bg-white border-[1px] pr-[1vw] pl-[0.5vw] rounded-md relative">
                  <FaSearch className="text-black text-[1vw] mr-[0.5vw]" />
                  <form action="" className="w-[15vw]">
                    <input
                      type="text"
                      onChange={handleSearch}
                      value={search}
                      placeholder="Search"
                      className="p-[0.5vw] text-black focus:outline-none w-full"
                    />
                  </form>
                  {showSuggestions && suggestions.length > 0 && (
                    <div
                      ref={dropdownRef}
                      className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-b-md shadow-lg z-50"
                    >
                      {suggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </nav>
    </header>
  );
};

export default Header;
