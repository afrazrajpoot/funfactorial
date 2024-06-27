import React from "react";
import Ribbons from "../components/Ribbons";
import Card from "../components/Card";
import { cardData } from "../data";

const AsultCourse = () => {
  return (
    <main className="flex items-start gap-[2vw]">
      <section className="mt-[1vw]">
        <Ribbons />
      </section>
      <section className="p-[2vw]">
        <h1 className="text-[#ed145b] text-[2.3vw] font-bold text-center">
          ASSAULT COURSE
        </h1>
        <h1 className="text-[#ed145b] text-[2.3vw] font-bold mt-[1vw] text-center">
          ABSOLUTELY AWESOME SELECTION OF EVENT INFLATABLES AVAILABLE TO HIRE.
        </h1>
        <p className="text-blue-700 mt-[1vw] text-[1vw] text-center">
          www.funfactorleeds.co.uk
        </p>
        <article className="grid grid-cols-4 gap-[3vw] pr-[3vw] mt-[1vw]">
          {cardData?.map((elem, ind) => (
            <Card key={ind} {...elem} w="16.5" />
          ))}
        </article>
      </section>
    </main>
  );
};

export default AsultCourse;
