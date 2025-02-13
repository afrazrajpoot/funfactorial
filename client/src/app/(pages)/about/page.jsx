'use client';
import React from "react";
// dynamic import
import dynamic from "next/dynamic";

// Dynamically import Ribbons and Card with ssr: false
const Ribbons = dynamic(() => import("@/components/Ribbons"), { ssr: false });

const About = () => {
  const aboutData = [
    {
      info: "We are a family-run attractions business based in Leeds & Wakefield offering top quality equipment and inflatables, excellent customer service and good value for money.",
    },
    {
      info: "We offer great party deals and have a wide range of equipment that can be used for birthday parties, weddings, christenings and any family gathering.",
    },
    {
      info: "We can also cater for schools, clubs, corporate events, team building days, fun days, carnivals, fetes and public events.",
    },
    {
      info: "We operate from right across Leeds, Wakefield, Castleford, Pontefract and the surrounding areas.",
    },
    {
      info: "Our aim is to bring fun, laughter and smiles to your event!",
    },
  ];
  const lists = [
    "* Various sizes of Inflatable's for all ages.",
    "* Bouncy Castle's with Slide's.",
    "* Largest Selection of Disco Dome's.",
    "* Mega Slide's & Assault course's.",
    "* Soft Play / Ball Pool's.",
    "* Great selection of Party extra's.",
  ];
  return (
    <main className="flex items-start">
      <section className="mt-[1vw] hidden lg:block">
        <Ribbons />
      </section>
      <section className="mt-[1vw]">
        <h1 className="text-[#ed145b] text-[10vw] text-center lg:text-left mt-[10vw] lg:mt-[1vw] lg:text-[2.3vw]  font-ab">
          About US
        </h1>
        <article className="flex flex-col gap-[1.5vw] mt-[1vw]">
          {aboutData.map((item, index) => (
            <p
              key={index}
              className="w-full text-center lg:text-left px-[3vw] lg:px-[0vw] lg:max-w-[60vw]"
            >
              {item.info}
            </p>
          ))}
        </article>
        <ul className="mt-[1vw] px-[3vw] lg:px-[0vw]">
          {lists.map((elem, ind) => (
            <li key={ind}>{elem}</li>
          ))}
        </ul>
        <p className="mt-[1vw] px-[3vw] lg:px-[0vw]">
          Please feel free to contact us and we will be delighted to talk to
          you!
        </p>
        <p className="font-bold mt-[1vw] px-[3vw] lg:px-[0vw]">
          Regards, Silvia & Derek
        </p>
      </section>
    </main>
  );
};

export default About;
