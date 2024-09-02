import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { cardData, newsData } from "../data";
import Ribbons from "../components/Ribbons";
import { Button } from "@mui/material";
import { useGlobalState } from "../context/globalState";
import { useAvalbilityMutation } from "../store/storeApi";
import Loading from "../components/Loader";
import { toast } from "sonner";
import {
  FaStar,
  FaInfoCircle,
  FaRuler,
  FaCheckCircle,
  FaFlask,
  FaShoppingCart,
} from "react-icons/fa";

const Detail = () => {
  const [detail, setDetail] = useState("Details");
  const { id } = useParams();
  const index = Number(id);
  const itemData = index >= 0 && index < cardData.length ? cardData[index] : null;

  const buttons = [
    { name: "Details", icon: <FaInfoCircle /> },
    { name: "Size", icon: <FaRuler /> },
    { name: "Suitability", icon: <FaCheckCircle /> },
    { name: "Tests", icon: <FaFlask /> },
  ];

  const { itemDetail, setItemDetail } = useGlobalState();
  const navigate = useNavigate();
  const [available, { isLoading, isSuccess, isError, data }] = useAvalbilityMutation();

  const handleClick = async () => {
    await available({ itemName: itemData.title });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message, {
        position: "top-center",
        duration: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
    if (isError) {
      setItemDetail({ name: itemData?.title, price: itemData?.price, id: id });
      navigate(`/contact`);
    }
  }, [isSuccess, isError]);

  return (
    <main className="flex mt-8 w-full bg-white">
      <section className="mt-4 hidden lg:block">
        <Ribbons />
      </section>
      <section className="p-8 w-full lg:max-w-[80vw]">
        {itemData ? (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-red-800 w-full p-4">
              <h1 className="font-bold font-ab text-center text-4xl lg:text-5xl text-white">
                {itemData.title}
              </h1>
            </div>

            <article className="flex lg:flex-row flex-col">
              <figure className="w-full lg:max-w-[24vw] p-4">
                <img src={itemData?.img} alt="img" className="rounded-lg shadow-md w-full" />
              </figure>

              <section className="lg:mt-4 p-6 flex-grow">
                <div className="flex mb-6">
                  {buttons.map((button, i) => (
                    <button
                      onClick={() => setDetail(button.name)}
                      key={i}
                      className={`flex items-center justify-center w-full px-4 py-2 text-sm lg:text-base font-medium text-gray-700 transition duration-300 border-b-2 hover:bg-gray-100 ${
                        detail === button.name
                          ? "border-red-600 text-red-600"
                          : "border-transparent"
                      }`}
                    >
                      {button.icon}
                      <span className="ml-2">{button.name}</span>
                    </button>
                  ))}
                </div>

                <h1 className="text-2xl lg:text-3xl font-ab font-bold mt-6 text-gray-800 flex items-center">
                  <FaStar className="text-yellow-400 mr-2" />
                  DISCOVER THE LATEST THRILLS OF 2024 AT FUN FACTOR LEEDS!
                </h1>

                <p className="font-pt mt-4 text-gray-600">
                  Welcome to our New Arrivals page. Fun Factor Leeds is thrilled to unveil the
                  hottest additions for 2024 that promise to elevate your celebrations to new
                  heights. Let's dive into the latest arrivals that will add a splash of joy and
                  entertainment to your events!
                </p>

                <article className="mt-8 space-y-8">
                  {newsData?.map((elem, ind) => (
                    <div key={ind} className="bg-gray-50 p-4 rounded-lg">
                      <h2 className="text-xl lg:text-2xl font-ab font-bold text-gray-800">
                        {elem.title}
                      </h2>
                      <p className="mt-2 text-gray-600">{elem.info}</p>
                      <Link
                        to="#"
                        className="text-blue-500 font-medium mt-2 inline-block hover:underline"
                      >
                        👉 Add {elem.title} to Your Event!
                      </Link>
                    </div>
                  ))}

                  <Button
                    onClick={handleClick}
                    variant="contained"
                    className="mt-6 p-3 bg-blue-500 hover:bg-blue-600 transition duration-300 w-full"
                    startIcon={<FaShoppingCart />}
                  >
                    {isLoading ? <Loading /> : `Book now for ${itemData?.price}`}
                  </Button>
                </article>
              </section>
            </article>
          </div>
        ) : (
          <p className="text-center text-gray-600 text-xl">Data not found</p>
        )}
      </section>
    </main>
  );
};

export default Detail;
