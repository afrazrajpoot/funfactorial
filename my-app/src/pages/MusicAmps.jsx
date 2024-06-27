import React from "react";
import Ribbons from "../components/Ribbons";

const MusicAmps = () => {
  return (
    <main className="flex items-start ">
      <section className="mt-[1vw]">
        <Ribbons />
      </section>
      <section className="p-[2vw]">
        <h1 className="text-[#ed145b] text-[2.3vw] font-medium font-ab">
          MUSIC AMP HIRE IN LEEDS & WAKEFIELD
        </h1>
        <p className="mt-[1vw] font-pt text-[1vw]">
          Book with any{" "}
          <span className="text-blue-500">
            Bouncy Castle or Soft Play Package
          </span>
        </p>
        <p className="mt-[1vw] font-pt text-[1vw]">
          Call us on <span className="text-blue-500">07531522289</span>
        </p>
      </section>
    </main>
  );
};

export default MusicAmps;
