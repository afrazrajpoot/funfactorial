import React from "react";
import Ribbons from "../components/Ribbons";
import { cardData } from "../data";
import Card from "../components/Card";

const PartyAddOns = () => {
  return (
    <main className="flex items-start ">
      <section className="mt-[1vw]">
        <Ribbons />
      </section>
      <section className="p-[2vw]">
        <h1 className="text-[#ed145b] text-[2.3vw] font-bold">
          HIRE PARTY ADD-ONS IN LEEDS & WAKEFIELD
        </h1>
        <p className="mt-[1vw] text-[1vw] font-pt">
          A selection of party add-on's, great for larger parties allowing more
          children to be entertained whilst the bouncy castle is being used by
          others, Making sure everyone is happy.
        </p>
        <article className="grid grid-cols-4 gap-[3vw] pr-[3vw] mt-[1.5vw]">
          {cardData?.map((elem, ind) => (
            <Card key={ind} {...elem} w="16.5" />
          ))}
        </article>
      </section>
    </main>
  );
};

export default PartyAddOns;
