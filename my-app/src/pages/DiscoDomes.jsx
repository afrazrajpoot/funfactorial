import React from "react";
import Ribbons from "../components/Ribbons";
import { cardData, chrismisList, chrismisList2 } from "../data";
import Card from "../components/Card";

const DiscoDomes = () => {
  return (
    <main className="flex items-start ">
      <section className="mt-[1vw]">
        <Ribbons />
      </section>
      <section className="p-[2vw]">
        <h1 className="text-[#ed145b] text-[2.3vw] font-medium font-ab">
          LARGEST SELECTION OF DISCO DOME BOUNCY CASTLE'S FOR HIRE IN LEEDS,
          WAKEFIELD, CASTLEFORD & PONTEFRACT.
        </h1>
        <p className="mt-[1vw] font-pt text-[1vw]">
          Please take a look at our range of disco dome bouncy castles for hire
          in west Yorkshire! We're operating in the whole of Leeds & Wakefield.
          For more information click 'book online' or give us a call on
          <span className="font-bold"> 07531522289 </span>to find out more.
        </p>
        <p className="text-[1vw] font-pt">
          Booking a bouncy castle is so easy.
        </p>
        <article className="mt-[1vw]">
          <ul className="list-disc ml-5">
            {chrismisList.map((item, index) => (
              <li key={index} className="font-pt text-[1vw] font-bold">
                {item.li}
              </li>
            ))}
          </ul>
        </article>
        <p className="mt-[1vw] font-pt text-[1vw]">
          If you need more reasons to book with Fun Factor Leeds....
        </p>
        <article className="ml-[1vw] mt-[1vw]">
          <ul className="list-disc ml-5">
            {chrismisList2?.map((item, index) => (
              <li
                key={index}
                className={`font-pt text-[1vw] font-bold ${
                  index === 5 && "font-ab font-thin mt-[1vw]"
                }`}
              >
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

export default DiscoDomes;
