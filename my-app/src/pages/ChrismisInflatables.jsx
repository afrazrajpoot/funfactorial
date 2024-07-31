import React from "react";
import Ribbons from "../components/Ribbons";
import { cardData, chrismisList, chrismisList2 } from "../data";
import Card from "../components/Card";

const ChrismisInflatables = () => {
  return (
    <main className="flex items-start gap-[2vw] mt-[1vw]">
      <section className="hidden lg:block">
        <Ribbons />
      </section>
      <section className="p-[1vw]">
        <p className="text-red-500 lg:w-[73.5vw] font-medium text-[7vw] w-[100vw]  lg:ml-[0vw]  lg:text-left text-center lg:text-[2.5vw] font-ab">
          HIRE CHRISTMAS INFLATABLES & PROPS IN LEEDS, WAKEFIELD, PONTEFRACT,
          BARNSLEY, HUDDERSFIELD
        </p>
        <p className="font-pt lg:text-[1vw] mt-[1vw] px-[3vw] lg:px-[0vw]">
          Booking a bouncy castle is so easy.
        </p>
        <article className="mt-[1vw]">
          <ul className="list-disc ml-5 px-[3vw] lg:px-[0vw]">
            {chrismisList.map((item, index) => (
              <li key={index} className="font-pt lg:text-[1vw]">
                {item.li}
              </li>
            ))}
          </ul>
        </article>
        <p className="mt-[1vw] font-pt lg:text-[1vw] px-[3vw] lg:px-[0vw]">
          If you need more reasons to book with Fun Factor Leeds....
        </p>
        <article className="ml-[1vw]">
          <ul className="list-disc ml-5 px-[3vw] lg:px-[0vw]">
            {chrismisList2.map((item, index) => (
              <li key={index} className="font-pt  lg:text-[1vw]">
                {item.li}
              </li>
            ))}
          </ul>
        </article>
        <p className="text-blue-400 mt-[2vw] ml-[1vw]">
          Home About Us Contact Us
        </p>
        <article className="lg:grid mt-[6vw] lg:mt-[1vw]  lg:grid-cols-4 lg:gap-[1vw] flex flex-col gap-[9vw]">
          {cardData?.map((elem, ind) => (
            <Card key={ind} {...elem} w="16.5" />
          ))}
        </article>
      </section>
    </main>
  );
};

export default ChrismisInflatables;
