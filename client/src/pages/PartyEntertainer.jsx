import React from "react";
import Ribbons from "../components/Ribbons";

const PartyEntertainer = () => {
  const partyImages = [
    {
      img: "https://www.funfactorleeds.co.uk/userfiles/screenshot-2019-08-28-at-094118-1.png",
    },
    {
      img: "https://www.funfactorleeds.co.uk/userfiles/screenshot-2019-08-28-at-094127.png",
    },
    {
      img: "https://www.funfactorleeds.co.uk/userfiles/screenshot-2019-08-28-at-094108.png",
    },
    {
      img: "https://www.funfactorleeds.co.uk/userfiles/screenshot-2019-08-28-at-094109.png",
    },
    {
      img: "https://www.funfactorleeds.co.uk/userfiles/screenshot-2019-08-28-at-094118.png",
    },
  ];
  return (
    <main className="flex items-start mt-[3vw]">
      <section className="mt-[1vw] hidden lg:block">
        <Ribbons />
      </section>
      <section className="p-[2vw] w-[100vw]">
        <figure>
          <img
            src="https://www.funfactorleeds.co.uk/userfiles/screenshot-2019-08-28-at-095353.png"
            alt="img"
          />
        </figure>
        <p className="text-blue-700 text-center lg:text-left  font-bold font-ab lg:text-[2vw] mt-[1vw]">
          WWW.SANDRA-ENTERTAINMENT.CO.UK
        </p>
        <p className="lg:text-[2vw] font-medium mt-[2vw] text-center lg:text-left font-ab  text-[#00b0f0]">
          BIG EVENTS FOR LITTLE PEOPLE WITH SANDRA WAS ESTABLISHED IN 2004 TO PROVIDE A MOBILE
          CHILDREN’S ENTERTAINMENT SERVICE THROUGHOUT YORKSHIRE. SANDRA OFFERS VALUE FOR MONEY,
          QUALITY PACKAGES AND HIGH STANDARDS OF PROFESSIONALISM.
        </p>
        <p className="lg:text-[2vw] text-center lg:text-left font-medium mt-[2vw] font-ab  text-[#00b0f0]">
          Call Sandra: 07709252579
        </p>
        <article>
          {partyImages?.map((image, index) => (
            <figure key={index} className="w-full lg:max-w-[60vw]">
              <img src={image.img} className="w-full" alt="party entertainer" />
            </figure>
          ))}
        </article>
      </section>
    </main>
  );
};

export default PartyEntertainer;
