'use client'; // If using Next.js 13 with app directory

import React from "react";
import dynamic from 'next/dynamic';

// Dynamically import Ribbons and Card with ssr: false
const Ribbons = dynamic(() => import("@/components/Ribbons"), { ssr: false });
const Card = dynamic(() => import("@/components/Card"), { ssr: false });

// Make sure `products` is correctly imported
import { products } from "@/app/data"; 

const SoftPlay = () => {

  return (
    <main className="flex items-start pr-[5vw] mt-[3vw] overflow-x-hidden overflow-y-hidden">
      <section className="mt-[1vw] hidden lg:block">
        <Ribbons />
      </section>

      <section className="ml-[3vw] lg:w-[67vw] pr-[4vw]">
        <h1 className="font-medium text-4xl lg:text-5xl text-center lg:text-left font-ab mb-4">
          🌟 Birthday Parties! 🎉✨
        </h1>
        <section className="lg:grid lg:grid-cols-4 mt-[3vw] lg:gap-x-[9vw] flex flex-col">
          {/* Add a check to ensure `products` is an array */}
          {Array.isArray(products) && products.length > 0 ? (
            products.map((elem, ind) => (
              <Card key={ind} {...elem} ind={ind} ml={"4vw"} />
            ))
          ) : (
            <p>No products available</p>
          )}
        </section>
      </section>
    </main>
  );
};

export default SoftPlay;
