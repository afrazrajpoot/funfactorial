import React from "react";
import Ribbons from "../components/Ribbons";
import { cardData, newsData } from "../data";
import Card from "../components/Card";

const News2024 = () => {
  return (
    <main className="flex flex-col lg:flex-row pr-[5vw] mt-[3vw]">
      <section className="mt-4 hidden lg:block lg:w-[25vw]">
        <Ribbons />
      </section>
      <section className="mt-4 lg:w-4/5  px-4 lg:px-8">
        <h1 className="font-medium text-4xl lg:text-5xl text-center lg:text-left font-ab mb-4">
          🌟 DISCOVER THE LATEST THRILLS OF 2024 AT FUN FACTOR LEEDS! 🎉✨
        </h1>
        <p className="text-black text-lg lg:text-xl text-center lg:text-left font-ab mb-8">
          Welcome to our New Arrivals page. Fun Factor Leeds is thrilled to unveil the hottest
          additions for 2024 that promise to elevate your celebrations to new heights. Let's dive
          into the latest arrivals that will add a splash of joy and entertainment to your events!
        </p>
        <article className="space-y-8 mb-12">
          {newsData?.map((elem, ind) => (
            <div key={ind} className="space-y-4">
              <h2 className="font-medium text-2xl lg:text-3xl text-center lg:text-left font-pt">
                {elem.title}
              </h2>
              <p className="text-center lg:text-left font-pt">{elem.info}</p>
              <p className="text-blue-500 font-medium font-pt text-center lg:text-left">
                👉 {ind === 0 && "Press here to Add Giant Disco Dome Bouncy Castle to Your Event!"}
                {ind === 1 && "Press here to Add Disco Bouncy Castle to Your Event!"}
                {ind === 2 && "Press here to Add 3D Dinosaur Bouncy castle to Your Event!"}
              </p>
            </div>
          ))}
        </article>
        <section className="lg:grid   lg:grid-cols-4 lg:gap-x-[6vw]  flex flex-col ">
          {cardData?.map((elem, ind) => (
            <Card key={ind} {...elem} w={17} ind={ind} ml={"5vw"} />
          ))}
        </section>
      </section>
    </main>
  );
};

export default News2024;
