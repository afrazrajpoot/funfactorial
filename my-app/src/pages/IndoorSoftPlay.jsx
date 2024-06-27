import React from "react";
import Ribbons from "../components/Ribbons";
import { cardData, indoorData, indoorLinking } from "../data";
import Card from "../components/Card";

const IndoorSoftPlay = () => {
  return (
    <main className="flex items-start gap-[1vw] mt-[1vw]">
      <section>
        <Ribbons />
      </section>
      <section>
        <h1 className="text-[#ed145b] text-[2.3vw] font-medium font-ab">
          SOFT PLAY & BOUNCY CASTLE PACKAGES AVAILABLE FROM FUN FACTOR LEEDS
        </h1>
        <article className="flex flex-col gap-[2vw] mt-[1vw]">
          {indoorData?.map((item, index) => {
            return (
              <div key={index}>
                <p className=" font-pt text-[1vw]">{item.info}</p>
              </div>
            );
          })}
        </article>

        <article className="flex gap-[0.5vw]">
          {indoorLinking?.map((elem, ind) => (
            <div key={ind} className="">
              <p className="  text-[#ed145b] underline font-pt font-medium text-[1vw] mt-[1vw]">
                <span className="font-bold text-black">|</span>
                {elem.url}
              </p>
            </div>
          ))}
        </article>
        <p className="font-bold text-[1vw] mt-[1vw]">
          If there is not a package below to suit your needs, please{" "}
          <span className="text-[#ed145b] font-bold underline">contact</span> Us
          with your enquiry or call the office on 07531522289 as we will be able
          to put a bespoke package together for you.
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

export default IndoorSoftPlay;
