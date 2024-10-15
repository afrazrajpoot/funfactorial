import React from "react";
import Ribbons from "../components/Ribbons";
import Card from "../components/Card";
import { cardData, products } from "../data";

const AsultCourse = () => {
  return (
    <main className="flex items-start gap-[2vw] pr-[5vw] overflow-hidden">
      {/* Ribbons Section */}
      <section className="mt-[2vw] hidden lg:block">
        <Ribbons />
      </section>

      {/* Main Content Section */}
      <section className="lg:w-[68vw] w-full flex flex-col items-center">
        {/* Heading */}
        <h1 className="text-center text-[#ed145b] mt-[5vw] lg:mt-[2vw] font-bold text-[7vw] lg:text-[2.5vw] lg:w-full">
          Disco DOmes
        </h1>

        {/* Card Grid */}
        <article className="lg:grid lg:grid-cols-4 lg:gap-[3vw] mt-[5vw] lg:mt-[2vw] flex flex-col gap-[6vw] items-center">
          {products?.map((elem, ind) => (
            <Card key={ind} {...elem} w="16.5" />
          ))}
        </article>
      </section>
    </main>
  );
};

export default AsultCourse;
