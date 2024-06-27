import React from "react";
import Ribbons from "../components/Ribbons";
import { cardData } from "../data";
import Card from "../components/Card";

const AdultCastles = () => {
  const bouncyList1 = [
    {
      li: "Click DETAILS & BOOKINGS for information of sizes and further details.",
    },
    {
      li: "CHECK AVAILABILITY straight away Online 24/7",
    },
    {
      li: "BOOK ONLINE once you have found the one you want",
    },
  ];
  const bouncyList2 = [
    {
      li: "FREE delivery to most LS & WF postcodes",
    },
    {
      li: "FREE set up and collection",
    },
    {
      li: "We hold £5million Public Liability Insurance",
    },
    {
      li: "Email confirmation will be sent to confirm your booking",
    },
    {
      li: "100% Reliable",
    },
    {
      li: "We hire to Leeds Morley Pudsey Rothwell Wakefield Castleford Pontefract Barnsley and Huddersfield as standard. If you are outside these areas please call the office on 07531522289 as occassionally we may be able to deliver out of area at quieter times.",
    },
  ];
  return (
    <main className="flex items-start mt-[1vw]">
      <section>
        <Ribbons />
      </section>
      <section className="p-[2vw]">
        <h1 className="text-[#ed145b] text-[2.3vw] font-medium font-ab">
          ADULT BOUNCY CASTLE HIRE LEEDS & WAKEFIELD
        </h1>
        <p className="mt-[1vw] font-pt text-[1vw]">
          Please take a look at our range of bouncy castles for hire in west
          Yorkshire! We're operating in the whole of Leeds & Wakefield - just
          take a look at our range of bouncy castles for hire in Leeds and our
          inflatables in Wakefield. For more information click 'book online' or
          give us a call on <span className="font-bold">07531522289</span> to
          find out more.
        </p>
        <p className="font-pt text-[1vw] mt-[1vw]">
          Booking a bouncy castle is so easy.
        </p>
        <article className="ml-[1vw] mt-[1vw]">
          <ul className="list-disc ml-5">
            {bouncyList1?.map((item, index) => (
              <li key={index} className="font-pt text-[1vw] font-bold">
                {item.li}
              </li>
            ))}
          </ul>
        </article>
        <p className="font-pt text-[1vw] mt-[1vw]">
          If you need more reasons to book with Fun Factor Leeds....
        </p>
        <article className="ml-[1vw] mt-[1vw]">
          <ul className="list-disc ml-5">
            {bouncyList2?.map((item, index) => (
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
        <p className="font-pt text-blue-500 text-[1vw] ml-[1vw] mt-[1vw]">
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

export default AdultCastles;
