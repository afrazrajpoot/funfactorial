'use client';

import React from "react";
// import Ribbons from "@/components/Ribbons";
// import Card from "@/components/Card";
import { products } from "@/app/data";

import dynamic from "next/dynamic";
const Ribbons = dynamic(() => import("@/components/Ribbons"), { ssr: false });
const Card = dynamic(() => import("@/components/Card"), { ssr: false });

const AsultCourse = () => {
  return (
    <main className="flex items-start gap-[2vw] pr-[5vw] overflow-hidden">
      {/* Ribbons Section */}
      <section className="mt-[2vw] hidden lg:block">
        <Ribbons />
      </section>

      {/* Main Content Section */}
      <section className="lg:w-[68vw] w-full flex flex-col items-center">
        {/* Heading */}
        <h1 className="text-center text-[#ed145b] mt-[5vw] lg:mt-[2vw] font-bold text-[7vw] lg:text-[2.5vw] lg:w-full">
          Other Inflatable
        </h1>

        {/* Card Grid */}
        <article className="lg:grid lg:grid-cols-4 lg:gap-[3vw] mt-[5vw] lg:mt-[2vw] flex flex-col gap-[6vw] items-center">
          { products && products.length > 0 && products?.map((elem, ind) => (
            <Card key={ind} {...elem} w="16.5" />
          ))}
        </article>
      </section>
    </main>
  );
};

export default AsultCourse;
