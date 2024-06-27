import React from "react";
import Ribbons from "../components/Ribbons";
import { deliveryPolicyData, termandconditionData } from "../data";

const TermAndCondition = () => {
  return (
    <main className="flex items-start">
      <section className="mt-[1vw]">
        <Ribbons />
      </section>
      <section className="mt-[1vw]">
        <h1 className="text-[#ed145b] w-full max-w-[70vw] text-[2.3vw] font-medium font-ab">
          UPON ARRIVAL THE HIRER WILL BE REQUIRED TO READ AND SIGN THE COMPANYS
          TERMS OF HIRE. BELOW IS A SHORTENED COPY OF THE TERMS IF YOU WISH TO
          READ A FULL VERSION IN ADVANCE PLEASE DO NOT HESITATE TO CONTACT THE
          OFFICE ON 07531522289 OR EMAIL
        </h1>
        <p className="text-[2.3vw] text-blue-500 font-bold">
          INFO@FUNFACTORLEEDS.CO.UK
        </p>
        <article className="flex flex-col gap-[1vw]">
          {termandconditionData?.map((elem, ind) => (
            <p className="w-full max-w-[65vw] text-[1vw] " key={ind}>
              {elem.info}
            </p>
          ))}
        </article>
        <article className="mt-[1vw]">
          <h2 className="font-bold text-[2vw] font-ab">Delivery Policy</h2>
          <article className="flex flex-col gap-[1vw] mt-[1vw]">
            {deliveryPolicyData?.map((elem, ind) => (
              <p className="w-full max-w-[65vw] text-[1vw] " key={ind}>
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
