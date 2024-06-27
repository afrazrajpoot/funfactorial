import React from "react";
import Ribbons from "../components/Ribbons";

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
      <section className="mt-[1vw]">
        <Ribbons />
      </section>
      <section className="mt-[1vw]">
        <h1 className="text-[#ed145b] text-[2.3vw]  font-ab">About US</h1>
        <article className="flex flex-col gap-[1.5vw] mt-[1vw]">
          {aboutData.map((item, index) => (
            <p key={index} className="w-full max-w-[60vw]">
              {item.info}
            </p>
          ))}
        </article>
        <ul className="mt-[1vw]">
          {lists.map((elem, ind) => (
            <li key={ind}>{elem}</li>
          ))}
        </ul>
        <p className="mt-[1vw]">
          Please feel free to contact us and we will be delighted to talk to
          you!
        </p>
        <p className="font-bold mt-[1vw]">Regards, Silvia & Derek</p>
      </section>
    </main>
  );
};

export default About;
