import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { cardData, newsData } from "../data";
import Ribbons from "../components/Ribbons";
import { Button } from "@mui/material";
import { useGlobalState } from "../context/globalState";
import { useAvalbilityMutation } from "../store/storeApi";
import Loading from "../components/Loader";
import { toast } from "sonner";
const Detail = () => {
  const [detail, setDetail] = useState("Details");
  const { id } = useParams(); // Destructure 'id' from useParams
  const index = Number(id); // Convert 'id' to a number to use as an index

  // Ensure the index is within the bounds of the array
  const itemData = index >= 0 && index < cardData.length ? cardData[index] : null;

 
  const buttons = ["Details", "size", "Suitability", "Tests"];
  const { itemDetail, setItemDetail } = useGlobalState();
  const navigate = useNavigate();
  const [available, { isLoading, isSuccess, isError, data }] = useAvalbilityMutation();
  const handleClick = async () => {
    await available({ itemName: itemData.title });
  };
  useEffect(() => {
    if (isSuccess) {
    
      toast.success(data?.message,{
        position: "top-center",
        duration: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
      console.log("data", data);
    }
    if (isError) {
      setItemDetail({ name: itemData?.title, price: itemData?.price, id: id });
      navigate(`/contact`);
      console.log("data", data);
    }
    console.log(itemData, "item data");
  }, [isSuccess, isError]);
  return (
    <main className="flex mt-[3vw] w-full">
      <section className="mt-[1vw] hidden lg:block">
        <Ribbons />
      </section>
      <section className="p-[2vw] w-full lg:max-w-[80vw]">
        {itemData ? (
          <div className="">
            <div className="bg-red-600 w-full p-[1vw] lg:p-[0.5vw]">
              <h1 className="font-bold font-ab text-center text-[4vw] lg:text-[2vw] text-white">
                {itemData.title}
              </h1>
            </div>

            <article className="flex lg:flex-row flex-col">
              <figure className="w-full lg:max-w-[24vw]">
                <img
                  src={itemData?.img}
                  alt="img"
                  className="bg-red-600 p-[1vw] lg:p-[0.5vw] w-full"
                />
              </figure>

              <section className="lg:mt-[1vw] p-[1vw] mt-[3vw]">
                <div className="flex">
                  {buttons.map((button, i) => (
                    <button
                      onClick={() => setDetail(button)}
                      key={i}
                      className={`w-full  px-[1vw] py-[1vw] lg:py-[0.5vw] text-[3vw] lg:text-[1vw] font-medium text-black transition duration-300  border-b-[1px] hover:bg-gray-200 ${
                        detail === button
                          ? "border-l-[1px] border-r-[1px] border-t-[1px] border-b-0  hover:bg-white"
                          : ""
                      }`}
                    >
                      {button}
                    </button>
                  ))}
                </div>
                {/* <div className="border-[0.5px] mt-[1vw]"></div> */}
                <h1 className="lg:text-[2.3vw] text-[3vw] font-ab font-medium mt-[2vw] lg:mt-[1vw]">
                  🌟 DISCOVER THE LATEST THRILLS OF 2024 AT FUN FACTOR LEEDS! 🎉✨
                </h1>
                <p className="font-pt w-full lg:max-w-[70vw] mt-[2vw] lg:mt-[1vw] text-[2.5vw] lg:text-[1vw]">
                  Welcome to our New Arrivals page. Fun Factor Leeds is thrilled to unveil the
                  hottest additions for 2024 that promise to elevate your celebrations to new
                  heights. Let's dive into the latest arrivals that will add a splash of joy and
                  entertainment to your events!
                </p>
                <article className="flex flex-col gap-[2vw]">
                  {newsData?.map((elem, ind) => (
                    <div key={ind} className="flex flex-col">
                      <h2 className="lg:text-[2.3vw] text-[3vw] font-ab font-medium mt-[2vw] lg:mt-[1vw]">
                        {elem.title}
                      </h2>
                      <p className="w-full lg:max-w-[60vw] font-pt text-[3vw] lg:text-[1vw]">
                        {elem.info}
                      </p>
                      {ind === 0 && (
                        <p className="text-blue-500 font-medium font-pt lg:text-[1vw] mt-[1vw]">
                          👉Press here to Add Giant Disco Dome Bouncy Castle to Your Event!
                        </p>
                      )}
                      {ind === 1 && (
                        <p className="text-blue-500 font-medium font-pt lg:text-[1vw] mt-[1vw]">
                          👉Press here to Add Disco Bouncy Castle to Your Event!
                        </p>
                      )}
                      {ind === 2 && (
                        <p className="text-blue-500 font-medium font-pt lg:text-[1vw] mt-[1vw]">
                          👉 Press here to Add 3D Dinosaur Bouncy castle to Your Event!
                        </p>
                      )}
                    </div>
                  ))}

                  <Button
                    onClick={handleClick}
                    variant="contained"
                    className="mt-[2vw] lg:mt-[1vw] p-[1vw] bg-blue-500 "
                  >
                    {isLoading ? <Loading /> : `Book now ${itemData?.price}`}
                  </Button>
                </article>
              </section>
            </article>
          </div>
        ) : (
          <p>Data not found</p>
        )}
      </section>
    </main>
  );
};

export default Detail;
