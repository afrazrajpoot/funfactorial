import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { navData } from "../data";
import { Search } from "lucide-react";
import { useGlobalState } from "../context/globalState";
import { useCheckAvailibilityMutation } from "../store/storeApi";
import CryptoJS from 'crypto-js';

// Custom debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { search, setSearch, availableData, setAvailableData } = useGlobalState();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [deliveryArea, setDeliveryArea] = useState("");
  const [category, setCategory] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [date, setDate] = useState("");
  const [localSearch, setLocalSearch] = useState("");

  // Debounce the search term with a 300ms delay
  const debouncedSearchTerm = useDebounce(localSearch, 300);

  const encryptionKey = import.meta.env.VITE_SECRET_KEY;
  const adminEmail = 'subadmin@gmail.com';
  const adminPassword = 'Subadmin@123+';
  const [admin, setAdmin] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const [showHeader, setShowHeader] = useState();
  const [checkAvailibility, { isLoading, isError, isSuccess, data }] = useCheckAvailibilityMutation();

  // Memoized suggestion generation function
  const generateSuggestions = useCallback((searchTerm) => {
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
  }, []);

  // Handle local search input
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setLocalSearch(searchTerm);
  };

  // Effect for debounced search term
  useEffect(() => {
    setSearch(debouncedSearchTerm);
    generateSuggestions(debouncedSearchTerm);
  }, [debouncedSearchTerm, setSearch, generateSuggestions]);

  const handleSuggestionClick = (suggestion) => {
    setLocalSearch(suggestion);
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

  const searchProduct = async () => {
    if (date) {
      const res = await checkAvailibility({ date });
      setAvailableData(res.data.bookings);
      navigate('/check-availibility');
      return;
    }
    navigate(`/search-products?search=${category}`);
  };

  useEffect(() => {
    setShowHeader(location.pathname);
  }, []);

  useEffect(() => {
    const storedEmail = localStorage.getItem('subadminEmail');
    const storedPassword = localStorage.getItem('subadminPassword');
    if (storedEmail && storedPassword) {
      const decryptedEmail = CryptoJS.AES.decrypt(storedEmail, encryptionKey).toString(CryptoJS.enc.Utf8);
      const decryptedPassword = CryptoJS.AES.decrypt(storedPassword, encryptionKey).toString(CryptoJS.enc.Utf8);
      if (decryptedEmail === adminEmail && decryptedPassword === adminPassword) {
        setAdmin(true);
      }
    }
  }, []);

  return (
    <header className={`${showHeader === '/login' || showHeader === '/admin' && 'hidden'}`}>
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
            <NavLink
              to={item.url}
              className={`hidden lg:block font-bold items-center ${
                item.url === location.pathname ? "text-[#40327a]" : 'text-white'
              } hover:text-[#40327a] transition-colors duration-300`}
            >
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <span className="text-[1.3vw] font-ab mr-1">{item.title}</span>
              </motion.div>
            </NavLink>
            {index === 6 && (
              <div className="flex lg:translate-x-[15vw] w-full lg:max-w-[18vw] items-center bg-white border-[1px] pr-[1vw] pl-[0.5vw] rounded-md relative">
                <Search className="text-[#40327a] w-5 h-5 mr-[0.5vw]" />
                <form action="" className="lg:w-[15vw] w-full">
                  <input
                    type="text"
                    onChange={handleSearch}
                    value={localSearch}
                    placeholder="Search"
                    className="p-[2.5vw] md:p-[0.5vw] text-[#40327a] focus:outline-none w-full"
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