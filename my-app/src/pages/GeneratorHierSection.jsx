import React from "react";
import Ribbons from "../components/Ribbons";
import Card from "../components/Card";
import { cardData } from "../data";

const GeneratorHierSection = () => {
  const generatorList = [
    {
      info: "PLEASE NOTE: When ordering generators form Fun Factor Leeds, Make sure you are fully aware of the power requirements of each item and bear this in mind when selecting a location for your equipment.",
    },
    {
      info: "For example, if you select 3 inflatables and require 3 generator outlets, these 3 items must be grouped together within a distance of 100ft. They cannot be placed at separate ends of the venue.",
    },
    {
      info: "If you require inflatables to be erected in separate areas of the venue exceeding 100ft from one another, you must select 3 smaller generators as opposed to one larger one.",
    },
  ];
  return (
    <main className="flex items-start ">
      <section className="mt-[1vw]">
        <Ribbons />
      </section>
      <section className="p-[2vw]">
        <h1 className="text-[#ed145b] text-[2.3vw] font-medium font-ab">
          LEEDS & WAKEFIELD GENERATOR HIRE SECTION HIRE
        </h1>
        <p className="text-[1vw] font-pt mt-[1vw]">
          All our generators and petrol fans are genuine Honda engines, and all
          supplied with 4 hours fuel, Extra fuel can be supplied and all prices
          displayed below.
        </p>
        {generatorList.map((item, index) => (
          <p key={index} className="text-[1vw] text-[#ed145b] font-pt mt-[1vw]">
            {item.info}
          </p>
        ))}
        <p className="text-[1vw] text-[#ed145b] mt-[1vw]">
          If you are unsure of the requirements, please feel free to{" "}
          <span className="text-blue-500">contact</span> us on{" "}
          <span className="text-[#ed145b] font-bold">07531522289</span> for
          advice.
        </p>
        <article className="grid grid-cols-4 gap-[3vw] pr-[3vw] mt-[2vw]">
          {cardData?.map((elem, ind) => (
            <Card key={ind} {...elem} w="16.5" />
          ))}
        </article>
      </section>
    </main>
  );
};

export default GeneratorHierSection;
