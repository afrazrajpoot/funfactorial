import React from "react";
import Ribbons from "../components/Ribbons";
import { cardData } from "../data";
import Card from "../components/Card";

const DiscoDomes = () => {
  return (
    <main className="flex items-start gap-[2vw] mt-[2vw] pr-[5vw] overflow-hidden">
      {/* Left Sidebar with Ribbons */}
      <section className="hidden lg:block">
        <Ribbons />
      </section>

      {/* Main Content Section */}
      <section className="lg:w-[68vw] w-full flex flex-col items-center">
        {/* Heading */}
        <h1 className="text-center text-white bg-gradient-to-r from-purple-500 to-pink-500 font-bold lg:text-[2.5vw] text-[7vw] py-2 px-4 rounded-md shadow-lg w-[90%] lg:w-full mb-[3vw]">
          Go Kart
        </h1>

        {/* Card Grid */}
        <article className="lg:grid lg:mt-[2vw] lg:grid-cols-4 lg:gap-[2vw] flex flex-col gap-[6vw] w-full items-center">
          {cardData?.map((elem, ind) => (
            <Card key={ind} {...elem} w="16.5" />
          ))}
        </article>
      </section>
    </main>
  );
};

export default DiscoDomes;
