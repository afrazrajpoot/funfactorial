import React from "react";
import Ribbons from "../components/Ribbons";
import { cardData, newsData } from "../data";
import Card from "../components/Card";

const News2024 = () => {
  return (
    <main className="flex items-start gap-[1vw]">
      <section className="mt-[1vw] ">
        <Ribbons />
      </section>
      <section className="mt-[1vw] ">
        <h1 className="text-[2.3vw] font-ab font-medium">
          🌟 DISCOVER THE LATEST THRILLS OF 2024 AT FUN FACTOR LEEDS! 🎉✨
        </h1>
        <p className="font-pt w-full max-w-[70vw] mt-[1vw] text-[1vw]">
          Welcome to our New Arrivals page. Fun Factor Leeds is thrilled to
          unveil the hottest additions for 2024 that promise to elevate your
          celebrations to new heights. Let's dive into the latest arrivals that
          will add a splash of joy and entertainment to your events!
        </p>
        <article className="flex flex-col gap-[2vw]">
          {newsData?.map((elem, ind) => (
            <div key={ind} className="flex flex-col">
              <h2 className="font-medium  text-[2vw] font-pt">{elem.title}</h2>
              <p className="w-full max-w-[60vw] font-pt text-[1vw]">
                {elem.info}
              </p>
              {ind === 0 && (
                <p className="text-blue-500 font-medium font-pt text-[1vw] mt-[1vw]">
                  👉Press here to Add Giant Disco Dome Bouncy Castle to Your
                  Event!
                </p>
              )}
              {ind === 1 && (
                <p className="text-blue-500 font-medium font-pt text-[1vw] mt-[1vw]">
                  👉Press here to Add Disco Bouncy Castle to Your Event!
                </p>
              )}
              {ind === 2 && (
                <p className="text-blue-500 font-medium font-pt text-[1vw] mt-[1vw]">
                  👉 Press here to Add 3D Dinosaur Bouncy castle to Your Event!
                </p>
              )}
            </div>
          ))}
        </article>
        <article className="grid grid-cols-4 gap-[3vw] pr-[3vw] mt-[1vw]">
          {cardData?.map((elem, ind) => (
            <Card key={ind} {...elem} w="16.5" />
          ))}
        </article>
      </section>
    </main>
  );
};

export default News2024;
