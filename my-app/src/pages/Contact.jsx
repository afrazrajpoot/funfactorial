import React from "react";
import Ribbons from "../components/Ribbons";
import { contactData } from "../data";

const Contact = () => {
  const contactFormData = [
    {
      label: "Your Name",
      type: "text",
      name: "name",
      placeHolder: "Your Name",
    },
    {
      label: "Your Email Address",
      type: "text",
      name: "email",
      placeHolder: "Your Email Address",
    },
    {
      label: "Your Phone Number",
      type: "text",
      name: "phone",
      placeHolder: "Your Phone Number",
    },
    {
      label: "Your Location",
      type: "text",
      name: "location",
      placeHolder: "Your Location",
    },
    {
      label: "Your Enquiry",
      type: "textarea",
      name: "enquiry",
      placeHolder: "Your Enquiry",
    },
  ];
  const textShadowStyle = {
    textShadow:
      "0 0 0 #000, -1px -1px 0 #000, 0 -1px 0 #000, 1px -1px 0 #000, 1px 0 0 #000, 1px 1px 0 #000, 0 1px 0 #000, -1px 1px 0 #000, -1px 0 0 #000",
    color: "#fff", // Setting text color to white for contrast
  };
  return (
    <main className="flex items-start p-4">
      <section className="hidden lg:block">
        <Ribbons />
      </section>
      <section className="ml-4">
        <h1 className="text-[#ed145b] text-center lg:text-left text-[7vw] lg:text-[2.3vw] font-medium font-ab mb-4">
          CONTACT FUN FACTOR LEEDS
        </h1>
        <p className="mb-4 lg:text-[1vw]">
          It couldn't be easier to get in touch with us here at Fun Factor Leeds. You can use the
          contact form at the bottom of this page or:
        </p>
        <ul className="list-disc ml-[4vw] text-[1vw]">
          {contactData?.map((elem, ind) => (
            <li key={ind} className="mb-2">
              <h2 className="font-bold text-[3vw] lg:text-[1vw] inline">{elem.title}</h2>
              <p
                className={`${
                  ind === 0 ? "text-black" : "text-blue-400 lg:text-[1vw] text-[3vw]"
                } inline ml-2 text-[3vw] lg:text-[1vw]`}
              >
                {elem.info}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-[1vw] text-[3vw] lg:text-[1vw]">
          We operate 7 days a week 365 days a year.
        </p>
        <p className="mt-[1vw] text-[3vw] lg:text-[1vw]">
          Fun Factor Leeds for all your bouncy castle hire & soft play hire needs in Leeds,
          Wakefield, Castleford, Pontefract and surrounding areas.
        </p>
        <article className="mt-[1vw] bg-blue-200 pt-[2vw] shadow-lg rounded-md">
          <h2 className="text-blue-500 text-[3vw] lg:text-[1.5vw] text-center mt-[-1vw] p-[0.4vw] font-medium font-ab">
            Quick Enquiry Form
          </h2>
          <form action="" className="bg-white p-[2vw] flex flex-col">
            {contactFormData?.map((elem, ind) => (
              <div key={ind} className="mb-4 bg-white flex items-center">
                <label
                  htmlFor={elem.name}
                  className="w-[30vw] lg:translate-x-[10vw] text-[3vw] lg:text-[1vw] text-center"
                >
                  {elem.label}:
                </label>
                {elem.type === "textarea" ? (
                  <textarea
                    rows={5}
                    name={elem.name}
                    id={elem.name}
                    placeholder={elem.placeHolder}
                    className="border border-black text-[3vw] lg:text-[1vw] p-[0.5vw] rounded-md flex-1"
                  />
                ) : (
                  <input
                    type={elem.type}
                    name={elem.name}
                    id={elem.name}
                    placeholder={elem.placeHolder}
                    className="border border-black text-[3vw] lg:text-[1vw] p-[1.5vw] lg:p-[0.5vw] rounded-md flex-1"
                  />
                )}
              </div>
            ))}
            <input
              style={textShadowStyle}
              type="submit"
              className="bg-[#ed145b] hover:cursor-pointer hover:bg-yellow-400 p-[1.5vw] lg:p-[0.5vw] rounded-md shadow-lg font-playwrite text-[3vw] lg:text-[1.5vw] w-full max-w-[30vw] lg:max-w-[12vw] ml-[55vw] lg:ml-[41.5vw] mt-[1vw]"
              value={"send enquiry"}
              name=""
              id=""
            />
          </form>
        </article>
      </section>
    </main>
  );
};

export default Contact;
