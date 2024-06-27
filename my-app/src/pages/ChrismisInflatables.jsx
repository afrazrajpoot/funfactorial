import React from "react";
import Ribbons from "../components/Ribbons";
import { cardData, chrismisList, chrismisList2 } from "../data";
import Card from "../components/Card";

const ChrismisInflatables = () => {
  return (
    <main className="flex items-start gap-[2vw] mt-[1vw]">
      <section>
        <Ribbons />
      </section>
      <section className="p-[1vw]">
        <h1 className="text-[#ed145b] w-full max-w-[70vw] text-[2.3vw] font-medium font-ab">
          HIRE CHRISTMAS INFLATABLES & PROPS IN LEEDS, WAKEFIELD, PONTEFRACT,
          BARNSLEY, HUDDERSFIELD
        </h1>
        <p className="font-pt text-[1vw] mt-[1vw]">
          Booking a bouncy castle is so easy.
        </p>
        <article className="mt-[1vw]">
          <ul className="list-disc ml-5">
            {chrismisList.map((item, index) => (
              <li key={index} className="font-pt text-[1vw]">
                {item.li}
              </li>
            ))}
          </ul>
        </article>
        <p className="mt-[1vw] font-pt text-[1vw]">
          If you need more reasons to book with Fun Factor Leeds....
        </p>
        <article className="ml-[1vw]">
          <ul className="list-disc ml-5">
            {chrismisList2.map((item, index) => (
              <li key={index} className="font-pt text-[1vw]">
                {item.li}
              </li>
            ))}
          </ul>
        </article>
        <p className="text-blue-400 mt-[2vw] ml-[1vw]">
          Home About Us Contact Us
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

export default ChrismisInflatables;
