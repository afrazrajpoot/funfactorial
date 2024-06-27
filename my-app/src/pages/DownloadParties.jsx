import React from "react";
import { motion } from "framer-motion";
import Ribbons from "../components/Ribbons";
import { DownloadPartiesData } from "../data";
import { Link } from "react-router-dom";

const DownloadParties = () => {
  const links = [
    {
      url: "/",
      title: "Back to Home Page",
    },
    {
      url: "/bouncyCastels",
      title: "/Bouncy Castles",
    },
    {
      url: "/discoDomes",
      title: "/Disco domes",
    },
    {
      url: "/softPlay",
      title: "/Soft play",
    },
  ];

  return (
    <main className="">
      <section className="mt-[1vw] flex items-start">
        <aside>
          <Ribbons />
        </aside>
        <section>
          <p className="text-[#ed145b] text-[2.3vw] font-medium font-ab">
            DOWNLOAD PARTY INVITATIONS
          </p>
          <div className="mt-[1vw]">
            <p className="text-[1vw]">
              Use the links below to download invites for your party!
            </p>
            <p className="text-[1vw] mt-[2vw]">
              Free for everyone to download and print.
            </p>
          </div>
          <div className="flex ">
            {links.map((elem, ind) => (
              <Link
                to={elem.url}
                key={ind}
                className="text-[#256ec2] text-[1vw] hover:text-[black] transition-all duration-300"
              >
                {elem.title}
              </Link>
            ))}
          </div>
          <article className="grid grid-cols-4 gap-[2vw] mt-[3vw]">
            {DownloadPartiesData?.map((elem, ind) => (
              <motion.main
                key={ind}
                className="shadow-lg bg-[#def0fc] rounded-md"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                  transition: { duration: 0.3 },
                }}
              >
                <p className="text-[#256ec2] text-[1.3vw] font-bold text-center p-[1vw]">
                  {elem.title}
                </p>
                <motion.figure className="w-full max-w-[15vw] p-[1vw] bg-white rounded-md overflow-hidden cursor-pointer">
                  <img
                    src={elem.img}
                    alt="img"
                    className="w-full object-cover"
                  />
                  <p className="text-center text-[1.2vw]">
                    Download:{" "}
                    <span className="text-[#256ec2] font-bold">PDF</span> /{" "}
                    <span className="text-[#256ec2] font-bold">JPG</span>
                  </p>
                </motion.figure>
              </motion.main>
            ))}
          </article>
        </section>
      </section>
    </main>
  );
};

export default DownloadParties;
