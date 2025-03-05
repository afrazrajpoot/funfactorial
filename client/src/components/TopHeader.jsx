'use client';
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MobileHeader from "./MobileHeader";
import Link from 'next/link';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@mui/material";
import { useGlobalState } from "@/context/globalState";
import {BasicDatePicker, MobileDatePicker} from "./BasicDatePicker";
import CryptoJS from 'crypto-js';
import { useRouter } from "next/navigation";
import { useCheckAvailibilityMutation } from "@/app/store/storeApi";
const TopHeader = () => {

const [showHeader,setShowHeader] = useState()
const [scrollPosition, setScrollPosition] = useState(0);
const { search, setSearch,availableData,setAvailableData } = useGlobalState();
const [showSuggestions, setShowSuggestions] = useState(false);
const [deliveryArea, setDeliveryArea] = useState("");
const [category, setCategory] = useState("");
const [suggestions, setSuggestions] = useState([]);
const [date,setDate] = useState("");

const encryptionKey = process.env.NEXT_PUBLIC_SECRET_KEY;
const adminEmail = 'subadmin@gmail.com';
const adminPassword = 'Subadmin@123+';
const [admin, setAdmin] = useState(false);



  const {push: navigate} = useRouter();
const handleDeliveryChange = (event) => {
  setDeliveryArea(event.target.value);
};

const handleCategory = (event) => {
  setCategory(event.target.value);
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
// const [showHeader,setShowHeader] = useState()
// const location = useLocation()
const [checkAvailibility,{isLoading,isError,isSuccess,data}] = useCheckAvailibilityMutation()
const searchProduct = async ()=>{
if(date){
const res = await checkAvailibility({date})
console.log(res)
  setAvailableData(res.data.bookings)

  navigate('/check-availibility')
  return
}
navigate(`/search-products?search=${category}`)
}

useEffect(()=>{
  setShowHeader(location.pathname)
},[])

useEffect(() => {
  if (typeof window !== 'undefined') {
  const storedEmail = localStorage.getItem('subadminEmail');
  const storedPassword = localStorage.getItem('subadminPassword');
  if (storedEmail && storedPassword) {
    const decryptedEmail = CryptoJS.AES.decrypt(storedEmail, encryptionKey).toString(CryptoJS.enc.Utf8);
    const decryptedPassword = CryptoJS.AES.decrypt(storedPassword, encryptionKey).toString(CryptoJS.enc.Utf8);
    if (decryptedEmail === adminEmail && decryptedPassword === adminPassword || storedEmail) {
      setAdmin(true);
    }
  } 
  }
}, []);
useEffect(()=>{
  setShowHeader(location.pathname)
},[])
  return (
    <>
      <MobileHeader />

      <div className={`relative overflow-hidden ${showHeader === '/login' || showHeader ==='/admin' && 'hidden'}`}>
        {/* <Slider {...sliderSettings} className="h-[50vw] lg:h-[25vw]">
          {slideImages.map((image, index) => (
            <div key={index} className="relative h-[50vw] lg:h-[25vw]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${image.img})`,
                }}
              />
              <div className="absolute inset-0 bg-green-200 opacity-50"></div>
            </div>
          ))}
        </Slider> */}
        <div className="relative h-[50vw] lg:h-[25vw]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(/images/firstImage.jpg)`,
            }}
          />
          <div className="absolute inset-0 bg-green-200 opacity-50"></div>
        </div>
        <header className="absolute top-0 left-0 w-full h-[30vw] flex items-center justify-center p-[2vw] lg:justify-between lg:p-[4vw]">
          <motion.section whileHover={{scale:1.1}} className="mt-[-18vw] relative hidden lg:block">
            <Link href="/" className="w-full block">
              <p className="font-genty text-[#f06eaa] text-[6vw] text-center">Fun</p>
              <p className="font-genty text-[#f06eaa] text-[6vw] absolute top-[5.5vw]">Rides</p>

            </Link>
          </motion.section>
          <section className="flex flex-col gap-[1vw] text-white text-center lg:text-left mt-[-10vw]">
            <h1 className="text-[7vw] lg:text-[2vw] text-center font-bold">CALL US TODAY ON</h1>

            <figure className="flex flex-col gap-[1vw] mt-[2vw] lg:mt-[1vw]">
              <h1 className="text-[6vw] lg:text-[2.5vw] text-center font-bold">07815 935423</h1>
              <p className="font-bold text-purple-900 text-[4vw] lg:text-[1.2vw]">
                We deliver across West Yorkshire area
              </p>
              <Link href="/contact" className="w-full max-w-[50vw] hidden lg:block lg:max-w-[17vw] lg:ml-[3vw] mt-[4vw] lg:mt-[0vw]">
                <img
                  src="https://www.funfactorleeds.co.uk/theme/email-address@1x.png"
                  alt="img"
                  className="w-full"
                />
              </Link>
            </figure>
          </section>
        </header>

        <article>
        <section>
          <article className="bg-[#b694c8] mt-[4vw] mb-[2vw] p-[2vw] w-full max-w-[95vw] lg:mt-[1vw] m-auto rounded-md flex lg:justify-around lg:flex-row flex-col lg:gap-[0vw] gap-[4vw]">
            <motion.p
              whileHover={{ scale: 1.1 }}
              className="font-genty text-[9vw]  lg:text-[2vw] text-purple-600"
            >
              Check Availability & Book Online
            </motion.p>
            <form className="flex lg:flex-row flex-col gap-[3vw] lg:ml-[5vw] w-full items-center">
              {/* <FormControl className="w-full lg:max-w-[15vw]">
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
              </FormControl> */}
              <FormControl className="w-full lg:max-w-[15vw] flex">
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
                <div className="lg:hidden">
                  <MobileDatePicker onSelectDate={(date)=> setDate(date)} />
                </div>
              </FormControl>
              <div className="hidden lg:block"> 
              <BasicDatePicker onSelectDate={(date)=> setDate(date)}/>
              </div>
             
            <Button
               onClick={searchProduct}
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

              { admin && <Link href={'/dashboard'} className="bg-[#40327a] text-white lg:p-[1vw] lg:w-[10vw] p-[3vw] text-center rounded-md lg:text-[1vw] text-[4vw]  font-medium w-full  h-[7vh]">Dashboard</Link>}
   
            </form>
          </article>
        </section>
      </article>
      </div>
    </>
  );
};

export default TopHeader;
