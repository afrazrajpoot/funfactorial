import React from "react";
import Ribbons from "../components/Ribbons";
import { faqData } from "../data";

const Faqs = () => {
  return (
    <main className="flex items-start">
      <section className="mt-[1vw]">
        <Ribbons />
      </section>
      <section className="mt-[1vw]">
        <h1 className="text-[#ed145b] text-[2.3vw] font-medium font-ab">
          FREQUENTLY ASKED QUESTIONS
        </h1>
        <article className="flex flex-col gap-[1vw] mt-[2.5vw]">
          {faqData?.map((faq, ind) => {
            return (
              <div key={faq.ind} className="flex flex-col gap-[1vw]">
                <h2 className="font-bold ">{faq.title}</h2>
                <p className="w-full max-w-[60vw]">{faq.info}</p>
              </div>
            );
          })}
        </article>
      </section>
    </main>
  );
};

export default Faqs;
