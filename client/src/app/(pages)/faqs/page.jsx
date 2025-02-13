'use client';

import React from "react";
import { faqData } from "@/app/data";
import dynamic from 'next/dynamic';

// Dynamically import Ribbons component with no SSR
const Ribbons = dynamic(() => import('@/components/Ribbons'), { ssr: false });

const Faqs = () => {
  return (
    <main className="flex items-start">
      <section className="mt-[1vw] hidden lg:block">
        <Ribbons />
      </section>
      <section className="mt-[1vw]">
        <h1 className="text-[#ed145b] text-[10vw] text-center lg:text-left mt-[10vw] lg:mt-[1vw] lg:text-[2.3vw] font-ab">
          FREQUENTLY ASKED QUESTIONS
        </h1>
        <article className="flex flex-col gap-[1vw] mt-[2.5vw]">
          {Array.isArray(faqData) && faqData.length > 0 && faqData.map((faq, ind) => {
            return (
              <div
                key={ind}
                className="flex flex-col gap-[5vw] lg:gap-[1vw]"
              >
                <h2 className="font-bold px-[3vw] text-center lg:text-left lg:px-[0vw]">
                  {faq?.title}
                </h2>
                <p className="w-full lg:max-w-[60vw] px-[3vw] text-center lg:text-left lg:px-[0vw]">
                  {faq?.info}
                </p>
              </div>
            );
          })}
        </article>
      </section>
    </main>
  );
};

export default Faqs;
