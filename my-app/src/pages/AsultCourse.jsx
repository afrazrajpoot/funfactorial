import React from "react";
import Ribbons from "../components/Ribbons";
import Card from "../components/Card";
import { cardData } from "../data";

const AsultCourse = () => {
  return (
    <main className="flex items-start gap-[2vw] pr-[5vw]">
      <section className="mt-[1vw] hidden lg:block">
        <Ribbons />
      </section>
      <section className="p-[2vw]">
        <h1 className="text-[#ed145b] mt-[5vw] lg:mt-[0vw] lg:text-[2.3vw] font-bold text-center">
          ASSAULT COURSE
        </h1>
        <h1 className="text-[#ed145b] lg:text-[2.3vw] font-bold mt-[1vw] text-center">
          ABSOLUTELY AWESOME SELECTION OF EVENT INFLATABLES AVAILABLE TO HIRE.
        </h1>
        <p className="text-blue-700 mt-[1vw] lg:text-[1vw] text-center">www.funfactorleeds.co.uk</p>
        <article className="lg:grid mt-[6vw] lg:mt-[1vw] ml-[-3vw]  lg:grid-cols-4 lg:gap-x-[7vw] flex flex-col">
          {cardData?.map((elem, ind) => (
            <Card key={ind} {...elem} w="16.5" />
          ))}
        </article>
      </section>
    </main>
  );
};

export default AsultCourse;
