import React from "react";
import Layout from "../components/Layout";


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
   <Layout>
     <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-8 text-center md:text-left">
        Cancellation and Adverse Weather Policy
      </h1>
      
      <div className="space-y-6">
        {privacyPolicyData.map((section, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="p-6">
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">
                {section.title}
              </h2>
              
              {section.info && (
                <p className="text-gray-600 leading-relaxed mb-4">
                  {section.info}
                </p>
              )}
              
              {section.lists && (
                <ul className="list-disc list-inside space-y-3 text-gray-600">
                  {section.lists.map((item, idx) => (
                    <li key={idx} className="leading-relaxed pl-4">
                      <span className="ml-[-1.5rem]">•</span> {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-700 font-medium text-center">
            Our delivery driver's decision is final. They have the rights to make any cancellations
            and their decision cannot be overturned.
          </p>
        </div>
      </div>
    </div>
   </Layout>
  );
};

export default PrivacyPolicy;
