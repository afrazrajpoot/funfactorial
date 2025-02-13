'use client'
import React, { createContext, useContext, useState } from "react";
const globalContext = createContext();
export const GlobalState = ({ children }) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [newBlog, setNewBlog] = useState(null);
  const [itemDetail, setItemDetail] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [availableData,setAvailableData] = useState();
  return (
    <globalContext.Provider value={{ itemDetail, setItemDetail, data, setData, search, setSearch ,availableData,setAvailableData, newBlog, setNewBlog}}>
      {children}
    </globalContext.Provider>
  );
};

export const useGlobalState = () => useContext(globalContext);
