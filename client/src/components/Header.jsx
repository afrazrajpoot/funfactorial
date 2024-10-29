import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { navData } from "../data"; // Assuming navData contains your navigation items
import { Search } from "lucide-react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@mui/material";
import { useGlobalState } from "../context/globalState";

const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { search, setSearch } = useGlobalState();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [deliveryArea, setDeliveryArea] = useState("");
  const [category, setCategory] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleDeliveryChange = (event) => {
    setDeliveryArea(event.target.value);
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
    console.log(event.target.value, 'selected category');
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);

    // Generate suggestions based on the search term
    if (searchTerm.length > 0) {
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
      "Fun Fairs",
      "Birthday Parties",
      "Indoor Bouncy Castles",
      "Bouncy castles",
      "Go Karting",
      "Zorb balls",
      "Football Penalty Shoutout",
      "Obstode Assault Course",
      "Other inflatables",
      "Disco Dome",
      "Inflatable Slides",
      "Generator Hire Section",
      'Obstacle Assult Course',
      'All Products',
      'Other Products'
    ],
  ];
const [showHeader,setShowHeader] = useState()
const location = useLocation()
  useEffect(()=>{
    setShowHeader(location.pathname)
  },[])
  return (
    <header className={`${showHeader === '/login' || showHeader === '/admin' && 'hidden'}`}>
      <article>
        <section>
          <article className="bg-[#b694c8] mt-[4vw] mb-[2vw] p-[2vw] w-full max-w-[95vw] lg:mt-[1vw] m-auto rounded-md flex lg:justify-around lg:flex-row flex-col lg:gap-[0vw] gap-[4vw]">
            <motion.p
              whileHover={{ scale: 1.1 }}
              className="font-genty text-[12vw] lg:text-[2vw] text-purple-600"
            >
              Check Availability & Book Online
            </motion.p>
            <form className="flex lg:flex-row flex-col gap-[3vw] lg:ml-[5vw] w-full items-center">
              <FormControl className="w-full lg:max-w-[15vw]">
                <InputLabel shrink={false}>
                  {!deliveryArea && "Set delivery area"}
                </InputLabel>
                <TextField
                  type="text"
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                  className="rounded-md w-full lg:max-w-[15vw] bg-white"
                  value={deliveryArea}
                  onChange={handleDeliveryChange}
                />
              </FormControl>
              <TextField
                type="date"
                margin="dense"
                InputLabelProps={{ shrink: true }}
                className="rounded-md w-full lg:max-w-[15vw] bg-white"
              />
              <FormControl className="w-full lg:max-w-[15vw]">
                <InputLabel shrink={false}>
                  {!category && "Select Category First"}
                </InputLabel>
                <Select
                  value={category}
                  onChange={handleCategory}
                  className="bg-white rounded-md w-full"
                  displayEmpty
                >
                  {selectOptions[1].map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            <Link to={`/search-products?search=${category}`}>
            <Button
               
                variant="contained"
                className="bg-[#40327a] lg:p-[1vw] h-[7vh] w-full lg:max-w-[10vw] rounded-md mt-[0.3vw]"
                style={{
                  backgroundColor: "#40327a",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Search
              </Button>
            </Link>
            </form>
          </article>
        </section>
      </article>
      <nav
        className={`bg-[#b694c8] lg:flex gap-[3vw] shadow-lg p-[4vw] lg:p-[2vw] justify-center ${
          scrollPosition > 500 && "mt-[-1.1px] opacity-95"
        } transition-all duration-300 ${
          scrollPosition > 500 ? "sticky left-0 top-0 w-full z-50" : ""
        }`}
        style={{ position: scrollPosition > 500 ? "fixed" : "relative" }}
      >
        {navData?.map((item, index) => (
          <div key={index} className="flex">
            <Link
              to={item.url}
              className="text-white hidden lg:block font-bold items-center hover:text-[#40327a] transition-colors duration-300"
            >
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <span className="text-[1.3vw] font-ab mr-1">{item.title}</span>
              </motion.div>
            </Link>
            {index === 5 && (
              <div className="flex lg:translate-x-[15vw] w-full lg:max-w-[18vw] items-center bg-white border-[1px] pr-[1vw] pl-[0.5vw] rounded-md relative">
                <Search className="text-[#40327a] w-5 h-5 mr-[0.5vw]" />
                <form action="" className="lg:w-[15vw] w-full">
                  <input
                    type="text"
                    onChange={handleSearch}
                    value={search}
                    placeholder="Search"
                    className="p-[0.5vw] text-[#40327a] focus:outline-none w-full"
                  />
                </form>
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-b-md shadow-lg z-50">
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
        ))}
      </nav>
    </header>
  );
};

export default Header;