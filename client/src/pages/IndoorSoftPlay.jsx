import React from "react";
import Ribbons from "../components/Ribbons";
import Card from "../components/Card";
import { cardData } from "../data";

const SoftPlay = () => {
  const softPlayData = [
    {
      info: "Our Soft Play Hire sets are very popular for under 5's that don't just want to bounce!",
    },
    {
      info: "Small children can be daunted by the noise, or nervous around so many excited children who they don’t know at a Soft Play Centre that you may want to create you own Soft Play Area either at home or in a local hall.",
    },
    {
      info: "Soft Play is perfect for birthday parties, christenings or weddings where you need to entertain small children and babies.",
    },
    {
      info: "You can hire the Soft Play set on its own or as part of a package where we offer generous discounts. The smaller soft play sets can fit in your house, and you can add on extras to fit in the space you have, or the larger soft play sets are perfect in a hall where you can add additional toys, bouncy castles, slides or obstacle course, the possibilities are endless.",
    },
  ];
  return (
    <main className="flex items-start pr-[5vw] mt-[3vw] overflow-x-hidden overflow-y-hidden">
      <section className="mt-[1vw] hidden lg:block">
        <Ribbons />
      </section>

      <section className="ml-[3vw] lg:w-[67vw] pr-[4vw]">
        {/* <h1 className="text-red-500 lg:w-[73.5vw] ml-[-2vw] px-[4vw] lg:px-[0vw] font-medium text-[7vw] w-[100vw]  lg:ml-[0vw]  lg:text-left text-center lg:text-[2.5vw] font-ab">
          SOFT PLAY HIRE LEEDS & SOFT PLAY HIRE WAKEFIELD
        </h1>
        <article className="flex flex-col gap-[4vw] lg:gap-[1vw]">
          {softPlayData.map((item, index) => (
            <p className="lg:text-[1vw] px-[3vw] lg:px-[0vw] font-pt mt-[1vw]" key={index}>
              {item.info}
            </p>
          ))}
        </article>
        <p className="lg:text-[1vw] font-pt mt-[1vw]">
          Before booking online we recommend you call the office on{" "}
          <span className="font-bold">07531522289</span>
          to confirm we can accommodate the delivery and collection times if hiring a hall!
        </p>
        <p className="lg:mt-[1vw] font-pt mt-[3vw] lg:text-[1vw]">
          Please note our Soft Play sets are for Indoor Use only.
        </p> */}
            <h1 className="font-medium text-4xl  lg:text-5xl text-center lg:text-left font-ab mb-4">
          🌟 Birthday Parties! 🎉✨
        </h1>
        <section className="lg:grid   lg:grid-cols-4 mt-[3vw] lg:gap-x-[9vw]  flex flex-col">
          {cardData?.map((elem, ind) => (
            <Card key={ind} {...elem} ind={ind} ml={"4vw"} />
          ))}
        </section>
      </section>
    </main>
  );
};

export default SoftPlay;
