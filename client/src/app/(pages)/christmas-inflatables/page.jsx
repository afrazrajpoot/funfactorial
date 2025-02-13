'use client';

import React from "react";
import { cardData } from "@/app/data";
import dynamic from 'next/dynamic';

// Dynamically import Ribbons component with no SSR
const Ribbons = dynamic(() => import('@/components/Ribbons'), { ssr: false });
const Card = dynamic(() => import('@/components/Card'), { ssr: false });

const ChrismisInflatables = () => {
  return (
    <main className="flex items-start gap-[2vw] mt-[2vw] pr-[5vw] overflow-hidden">
      {/* Ribbons Section */}
      <section className="hidden lg:block">
        <Ribbons />
      </section>
      
      {/* Main Content Section */}
      <section className="lg:w-[68vw] w-full flex flex-col items-center">
        {/* Heading */}
        <h1 className="text-center text-white bg-gradient-to-r from-red-500 to-yellow-500 font-bold lg:text-[2.5vw] text-[7vw] py-2 px-4 rounded-md shadow-lg lg:w-full w-[90%] mb-[3vw]">
          Indoor Bouncy Castles Event Packages
        </h1>
        
        {/* Card Grid */}
        <article className="lg:grid mt-[3vw] lg:mt-[2vw] lg:grid-cols-4 lg:gap-[3vw] flex flex-col gap-[6vw] w-full items-center">
          {cardData && cardData.length > 0 && cardData?.map((elem, ind) => (
            <Card key={ind} {...elem} w="16.5" />
          ))}
        </article>
      </section>
    </main>
  );
};

export default ChrismisInflatables;
