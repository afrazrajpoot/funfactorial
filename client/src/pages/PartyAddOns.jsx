import React from "react";
import Ribbons from "../components/Ribbons";
import Card from "../components/Card";
import { cardData } from "../data";

const PartAddOns = () => {
  return (
    <main className="flex items-start ">
      <section className="mt-[1vw] hidden lg:block">
        <Ribbons />
      </section>
      <section className="p-[2vw]">
        <h1 className="text-red-500  ml-[-2.5vw] px-[5vw] lg:px-[0vw] lg:w-[73.5vw] font-medium text-[7vw] w-[100vw]  lg:ml-[0vw]  lg:text-left text-center lg:text-[2.5vw] font-ab">
          Hire Party Add-ons in Leeds & Wakefield
        </h1>
        <p className="lg:text-[1vw] px-[3vw] lg:px-[0vw] text-center lg:text-left font-pt mt-[1vw]">
          A selection of party add-on's, great for larger parties allowing more children to be
          entertained whilst the bouncy castle is being used by others, Making sure everyone is
          happy.
        </p>

        <article className="lg:grid mt-[6vw] lg:mt-[1vw]  lg:grid-cols-4 lg:gap-[1vw] flex flex-col gap-[9vw]">
          {cardData?.map((elem, ind) => (
            <Card key={ind} {...elem} w="16.5" ml={"3.5vw"} />
          ))}
        </article>
      </section>
    </main>
  );
};

export default PartAddOns;
