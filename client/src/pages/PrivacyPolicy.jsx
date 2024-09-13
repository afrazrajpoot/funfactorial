import React from "react";
import Ribbons from "../components/Ribbons";

const PrivacyPolicy = () => {
  const privacyPolicyData = [
    {
      title: "Who is responsible for your data?",
      info: `Our data protection officer is responsible for managing your personal data. The data protection officer is responsible for making sure that your data is stored and processed safely. You can contact them anytime.`,
    },
    {
      title: "Why do we process and store your data?",
      info: "We need to store and process your data if you make an enquiry or place an order with us, to allow us to provide our services as a Equipment hirer. This includes your name, contact details, and IP address. We also need to store your details for tax and insurance reasons.",
    },
    {
      title: "How long will we keep your data?",
      info: "We may need to keep your personal details until up to 6 years after you were a customer of ours, for tax and insurance purposes. After this date your data will be anonymised, unless you have ‘opted in’ to receive ongoing communications from us.",
    },
    {
      title: "Who has access to your data?",
      info: "Our data protection officer is responsible for managing access to the personal data we store. Generally speaking, only the data protection officer and authorised members of staff will access your data.",
    },
    {
      info: "Some of the services we use will also store a copy of your data. For example, our website provider Booking Online Ltd, our email provider Fastmail, and any providers they use to provide their services. If you send your details over a social media platform, that platform may keep a copy of your messages.",
    },
    {
      title: "Who else might your data be shared with?",
      info: "We reserve the right to share your personal data with other third parties if required for legal reasons. For example, in the case of an insurance claim, a tax audit, or to prevent fraud.",
    },
    {
      title: "How can you see what data we store about you?",
      info: "You have the right to request details on any data we store about you. We can send a copy of your data to the email address you entered when using our services.",
    },
    {
      title: "Your right to deletion",
      info: "If you were previously a customer of ours, we might need to hold onto some of your data for tax or insurance reasons. Otherwise we will happily comply with your request as best we can.",
    },
    {
      title: "How can you opt in or out of our marketing messages?",
      info: "You can manage your marketing preferences at any time by clicking the link at the bottom of the emails we send, or by getting in touch with us through any other means.",
    },
    {
      title: "How does our website use cookies?",
      info: "Our website stores cookies on your browser to allow you to place an order with us. Our website’s cookies are temporary and cannot be used to identify individual visitors.",
    },
    {
      info: "Third parties might also set cookies on your browser. We use Google Analytics to monitor the performance of our website, for example. Third parties have their own cookie policies.",
    },
    {
      title: "How do you make a complaint about our use of your data?",
      info: "The Information Commissioners’ Office (ICO). is the authority for data protection in the UK. If you have an unresolvable problem with us and our use of your data, they are who you should contact.",
    },
  ];
  return (
    <main className="flex gap-[2vw]">
      <section className="mt-[1vw] hidden lg:block">
        <Ribbons />
      </section>

      <section className="flex flex-col gap-[5vw] lg:gap-[2vw] p-[1vw]">
        <h1 className="text-[#ed145b] text-[10vw] text-center lg:text-left lg:mt-[2vw] mt-[10vw] lg:text-[2.3vw] font-medium font-ab">
          PRIVACY POLICY
        </h1>
        {privacyPolicyData.map((item, index) => {
          return (
            <div key={index}>
              <h2 className="lg:text-[1.3vw]  text-center lg:text-left font-bold ">
                {item.title}
              </h2>
              <p className="lg:text-[1vw] text-center lg:text-left text-[3.5vw]">
                {item.info}
              </p>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default PrivacyPolicy;
