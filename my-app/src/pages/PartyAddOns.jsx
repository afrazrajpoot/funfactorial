import React from "react";
import Ribbons from "../components/Ribbons";
import { cardData } from "../data";
import Card from "../components/Card";

const PartyAddOns = () => {
  return (
    <main className="flex items-start ">
      <section className="mt-[1vw] hidden lg:block">
        <Ribbons />
      </section>
      <section className="p-[2vw]">
        <h1 className="text-red-500 ml-[-3vw] mt-[5vw] lg:mt-[1vw] font-medium text-[7vw] w-[100vw]  lg:ml-[0vw]  lg:text-left text-center lg:text-[2.5vw] font-ab">
          HIRE PARTY ADD-ONS IN LEEDS & WAKEFIELD
        </h1>
        <p className="mt-[1vw] w-[70vw] px-[3vw] lg:ml-[0vw] lg:px-[0vw] lg:text-[1vw] text-center lg:text-left ml-[13vw] font-pt">
          A selection of party add-on's, great for larger parties allowing more
          children to be entertained whilst the bouncy castle is being used by
          others, Making sure everyone is happy.
        </p>
        <section className="lg:grid mt-[5vw] lg:mt-[1vw]  lg:grid-cols-4 lg:gap-[3vw] pr-[3vw] flex flex-col gap-[9vw]">
          {cardData?.map((elem, ind) => (
            <Card key={ind} {...elem} w="16.5" ind={ind} ml={"3.5vw"} />
          ))}
        </section>
      </section>
    </main>
  );
};

export default PartyAddOns;
