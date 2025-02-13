'use client';

import React from "react";
// import Ribbons from "@/components/Ribbons";
import { deliveryPolicyData, termandconditionData } from "@/app/data";

import dynamic from "next/dynamic";
const Ribbons = dynamic(() => import("@/components/Ribbons"), { ssr: false });

const TermAndCondition = () => {
  return (
    <main className="flex items-start p-[2vw] lg:p-[0vw]">
      <section className="mt-[1vw] hidden lg:block">
        <Ribbons />
      </section>
      <section className="mt-[1vw]">
        <h1 className="text-[#ed145b] w-full text-center lg:text-left text-[6vw] lg:max-w-[70vw] lg:text-[2.3vw] font-medium font-ab">
          UPON ARRIVAL THE HIRER WILL BE REQUIRED TO READ AND SIGN THE COMPANYS TERMS OF HIRE. BELOW
          IS A SHORTENED COPY OF THE TERMS IF YOU WISH TO READ A FULL VERSION IN ADVANCE PLEASE DO
          NOT HESITATE TO CONTACT THE OFFICE ON 07531522289 OR EMAIL
        </h1>
        <p className="lg:text-[2.3vw] text-center mt-[3vw] lg:mt-[0vw] lg:text-left text-blue-500 font-bold">
          INFO@FUNFACTORLEEDS.CO.UK
        </p>
        <article className="flex flex-col gap-[2vw] mt-[4vw] lg:mt-[0vw] items-center lg:items-start  lg:gap-[1vw]">
          { termandconditionData && termandconditionData.length > 0 && termandconditionData?.map((elem, ind) => (
            <p
              className="w-full lg:max-w-[65vw] p-[2vw] lg:p-[0vw] text-center lg:text-left lg:text-[1vw] "
              key={ind}
            >
              {elem.info}
            </p>
          ))}
        </article>
        <article className="mt-[1vw]">
          <h2 className="font-bold text-center lg:text-left text-[5vw] lg:text-[2vw] font-ab">
            Delivery Policy
          </h2>
          <article className="flex flex-col gap-[1vw] mt-[1vw]">
            { deliveryPolicyData && deliveryPolicyData.length > 0 && deliveryPolicyData?.map((elem, ind) => (
              <p
                className="w-full lg:max-w-[65vw] text-center lg:text-left p-[2vw] lg:p-[0vw] lg:text-[1vw] "
                key={ind}
              >
                {elem.info}
              </p>
            ))}
          </article>
        </article>
      </section>
    </main>
  );
};

export default TermAndCondition;
