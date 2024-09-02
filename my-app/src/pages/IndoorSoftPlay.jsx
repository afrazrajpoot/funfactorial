import React from "react";
import Ribbons from "../components/Ribbons";
import { cardData, indoorData, indoorLinking } from "../data";
import Card from "../components/Card";

const IndoorSoftPlay = () => {
  return (
    <main className="flex items-start gap-[1vw] mt-[1vw]">
      <section className="hidden lg:block">
        <Ribbons />
      </section>
      <section>
        <p className="text-red-500 font-medium text-[7vw] w-[100vw]  lg:ml-[0vw]  lg:text-left text-center lg:text-[2.5vw] font-ab">
          SOFT PLAY & BOUNCY CASTLE PACKAGES AVAILABLE FROM FUN FACTOR LEEDS
        </p>
        <article className="flex flex-col gap-[2vw] mt-[1vw]">
          {indoorData?.map((item, index) => {
            return (
              <div key={index}>
                <p className=" font-pt px-[2vw] lg:px-[0vw] lg:text-left lg:text-[1vw] text-center">
                  {item.info}
                </p>
              </div>
            );
          })}
        </article>

        <article className="flex lg:flex-row flex-col lg:justify-start lg:mt-[1vw] mt-[4vw] justify-center lg:items-start items-center gap-[0.5vw]">
          {indoorLinking?.map((elem, ind) => (
            <div key={ind} className="">
              <p className="  text-[#ed145b] underline font-pt font-medium text-[2vw] lg:text-[1vw] mt-[1vw]">
                <span className="font-bold text-black">|</span>
                {elem.url}
              </p>
            </div>
          ))}
        </article>
        <p className="font-bold text-[2vw] lg:px-[0vw] mt-[4vw] lg:w-[50vw] px-[2vw] lg:text-[1vw] lg:mt-[1vw]">
          If there is not a package below to suit your needs, please{" "}
          <span className="text-[#ed145b] font-bold underline">contact</span> Us with your enquiry
          or call the office on 07531522289 as we will be able to put a bespoke package together for
          you.
        </p>
        <section className="lg:grid ml-[12vw]  lg:grid-cols-4 lg:gap-[3vw] pr-[3vw] flex flex-col ">
          {cardData?.map((elem, ind) => (
            <Card key={ind} {...elem} w="16" ind={ind} ml={"4vw"} />
          ))}
        </section>
      </section>
    </main>
  );
};

export default IndoorSoftPlay;
