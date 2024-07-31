import React from "react";
import Ribbons from "../components/Ribbons";
import { cardData, newsData } from "../data";
import Card from "../components/Card";

const News2024 = () => {
  return (
    <main className="flex items-start gap-[1vw]">
      <section className="mt-[1vw] hidden lg:block">
        <Ribbons />
      </section>
      <section className="mt-[1vw] ">
        <h1 className=" font-medium text-[8vw] w-[100vw]  lg:ml-[0vw]  lg:text-left text-center lg:text-[2.5vw] font-ab">
          🌟 DISCOVER THE LATEST THRILLS OF 2024 AT FUN FACTOR LEEDS! 🎉✨
        </h1>
        <p className="text-black lg:w-[60vw]  w-[100vw] lg:mt-[0vw] mt-[3vw] text-center lg:text-left text-[3vw] lg:text-[1vw]  font-ab">
          Welcome to our New Arrivals page. Fun Factor Leeds is thrilled to
          unveil the hottest additions for 2024 that promise to elevate your
          celebrations to new heights. Let's dive into the latest arrivals that
          will add a splash of joy and entertainment to your events!
        </p>
        <article className="flex flex-col gap-[2vw] mt-[5vw] lg:mt-[1vw]">
          {newsData?.map((elem, ind) => (
            <div key={ind} className="flex flex-col lg:gap-[1vw] gap-[5vw]">
              <h2 className="font-medium  text-[4vw] text-center lg:text-left  lg:text-[2vw] font-pt">
                {elem.title}
              </h2>
              <p className="w-full lg:max-w-[60vw] text-center lg:text-left lg:px-[1vw] px-[8vw] font-pt lg:text-[1vw]">
                {elem.info}
              </p>
              {ind === 0 && (
                <p className="text-blue-500 px-[3vw] lg:px-[0vw] font-medium font-pt lg:text-[1vw] mt-[1vw]">
                  👉Press here to Add Giant Disco Dome Bouncy Castle to Your
                  Event!
                </p>
              )}
              {ind === 1 && (
                <p className="text-blue-500 px-[3vw] lg:px-[0vw] font-medium font-pt lg:text-[1vw] mt-[1vw]">
                  👉Press here to Add Disco Bouncy Castle to Your Event!
                </p>
              )}
              {ind === 2 && (
                <p className="text-blue-500 px-[3vw] lg:px-[0vw] font-medium font-pt lg:text-[1vw] mt-[1vw]">
                  👉 Press here to Add 3D Dinosaur Bouncy castle to Your Event!
                </p>
              )}
            </div>
          ))}
        </article>
        <article className="lg:grid mt-[6vw] lg:mt-[1vw]  lg:grid-cols-4 lg:gap-[1vw] flex flex-col gap-[9vw]">
          {cardData?.map((elem, ind) => (
            <Card key={ind} {...elem} w="16.5" />
          ))}
        </article>
      </section>
    </main>
  );
};

export default News2024;
