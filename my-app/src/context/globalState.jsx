import React, { createContext, useContext, useState } from "react";
const globalContext = createContext();
export const GlobalState = ({ children }) => {
  const [data,setData] = useState([])
  const [itemDetail, setItemDetail] = useState({
    name: "",
    price: "",
  });
  return (
    <globalContext.Provider value={{ itemDetail, setItemDetail,data,setData }}>
      {children}
    </globalContext.Provider>
  );
};

export const useGlobalState = () => useContext(globalContext);