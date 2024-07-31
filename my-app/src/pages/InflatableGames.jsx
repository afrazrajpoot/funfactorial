import React from "react";
import Ribbons from "../components/Ribbons";
import { cardData } from "../data";
import Card from "../components/Card";

const InflatableGames = () => {
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
  ];
  return (
    <main className="flex items-start mt-[1vw]">
      <section className="hidden lg:block">
        <Ribbons />
      </section>
      <section className="p-[2vw]">
        <h1 className="text-red-500 lg:w-[73.5vw] font-medium text-[7vw] w-[100vw]  lg:ml-[0vw]  lg:text-left text-center lg:text-[2.5vw] font-ab">
          INFLATABLE GAMES HIRE IN LEEDS, WAKEFIELD, CASTLEFORD & PONTEFRACT.
        </h1>
        <p className="mt-[1vw] font-pt px-[3vw] lg:px-[0vw] lg:text-[1vw]">
          Our Pillow Bash or Gladiator Duel will deliver excitement and
          competition to your event. Be the champion and knock your opponent
          flying.
        </p>

        <article className="ml-[1vw] mt-[1vw]">
          <ul className="list-disc ml-5 px-[3vw] lg:px-[0vw]">
            {bouncyList2?.map((item, index) => (
              <li
                key={index}
                className={`font-pt lg:text-[1vw] text-[#ed145b] font-bold ${
                  index === 5 && "font-ab font-thin mt-[1vw]"
                }`}
              >
                {item.li}
              </li>
            ))}
          </ul>
        </article>
        <p className="mt-[1vw] font-pt px-[3vw] lg:Px-[0vw] lg:text-[1vw]">
          We hire to Leeds Morley Pudsey Rothwell Wakefield Castleford
          Pontefract Barnsley and ​Huddersfield as standard. If you are outside
          these areas please call the office on{" "}
          <span className="font-bold">07531522289</span>as occassionally we may
          be able to deliver out of area at quieter times.
        </p>
        <p className="font-pt text-blue-500 lg:text-[1vw] ml-[1vw] mt-[1vw]">
          Home About Us Contact Us
        </p>
        <section className="lg:grid  lg:grid-cols-4 lg:gap-[3vw] pr-[3vw] flex flex-col gap-[9vw]">
          {cardData?.map((elem, ind) => (
            <Card key={ind} {...elem} w="16.5" ind={ind} ml={"3.5vw"} />
          ))}
        </section>
      </section>
    </main>
  );
};

export default InflatableGames;
