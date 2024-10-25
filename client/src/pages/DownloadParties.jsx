import React from "react";
import { DownloadPartiesData } from "../data";
import Layout from "../components/Layout";

const DownloadParties = () => {
  const links = [
    {
      url: "/",
      title: "Back to Home Page",
    },
    {
      url: "/bouncyCastels",
      title: "Bouncy Castles",
    },
    {
      url: "/discoDomes",
      title: "Disco Domes",
    },
    {
      url: "/softPlay",
      title: "Soft Play",
    },
  ];

  return (
  <Layout>
      <main className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text mb-6">
            Party Invitations
          </h1>
          <div className="space-y-4">
            <p className="text-lg md:text-xl text-gray-700">
              Download and customize perfect invites for your special celebration!
            </p>
            <p className="text-lg md:text-xl text-gray-700">
              <span className="font-semibold text-purple-600">100% Free</span> for everyone to download and print.
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {links.map((elem, ind) => (
            <a
              key={ind}
              href={elem.url}
              className="px-4 py-2 rounded-md border border-gray-200 hover:bg-purple-50 hover:border-purple-200 transition-all duration-300 text-gray-700 hover:text-purple-700"
            >
              {elem.title}
            </a>
          ))}
        </div>

        {/* Download Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DownloadPartiesData?.map((elem, ind) => (
            <div 
              key={ind}
              className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-t-lg">
                <h3 className="text-xl text-center text-gray-800 font-semibold">
                  {elem.title}
                </h3>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={elem.img}
                    alt={elem.title}
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
                
                <div className="mt-4 flex justify-center gap-4">
                  <button 
                    className="px-4 py-2 rounded-md border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300 flex items-center space-x-2"
                    onClick={() => window.open(elem.pdfUrl)}
                  >
                    <span className="text-blue-600">Download PDF</span>
                  </button>
                  <button
                    className="px-4 py-2 rounded-md border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300 flex items-center space-x-2"
                    onClick={() => window.open(elem.jpgUrl)}
                  >
                    <span className="text-blue-600">Download JPG</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  </Layout>
  );
};

export default DownloadParties;