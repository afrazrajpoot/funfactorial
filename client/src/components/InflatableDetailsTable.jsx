import React from "react";
import {
  FaCheck,
  FaTimes,
  FaHome,
  FaTree,
  FaRoad,
  FaLeaf,
  FaFlag,
  FaRuler,
} from "react-icons/fa";

const ResponsiveTable = ({ children }) => (
  <div className="overflow-x-auto bg-white shadow-md rounded-lg">
    <div className="min-w-max">
      {children}
    </div>
  </div>
);

export const InflatableDetailsTable = ({ suitability }) => {
  const suitableItems = suitability?.filter((item) => !item.includes("Not Suitable")) || [];
  const notSuitableItems = suitability?.filter((item) => item.includes("Not Suitable")) || [];

  return (
    <ResponsiveTable>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">Detail</th>
            <th className="px-4 py-2 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          {suitableItems.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 font-semibold whitespace-nowrap">
                <FaCheck className="mr-2 text-green-500 inline" /> Suitable for
              </td>
              <td className="border px-4 py-2">
                {item === "Indoors on Hard Surface" && <FaHome className="mr-2 text-gray-600 inline" />}
                {item === "Outdoors on Grass" && <FaTree className="mr-2 text-green-600 inline" />}
                {item === "Outdoors on Hard Surface" && <FaRoad className="mr-2 text-gray-600 inline" />}
                {item}
              </td>
            </tr>
          ))}
          {notSuitableItems.map((item, index) => (
            <tr key={`not-${index}`}>
              <td className="border px-4 py-2 font-semibold whitespace-nowrap">
                <FaTimes className="mr-2 text-red-500 inline" /> Not Suitable for
              </td>
              <td className="border px-4 py-2">
                {item === "Not Suitable For Outdoors on Artificial Grass" && <FaLeaf className="mr-2 text-green-400 inline" />}
                {item === "Not Suitable For Outdoors on Flags" && <FaFlag className="mr-2 text-blue-500 inline" />}
                {item}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ResponsiveTable>
  );
};

export const UsersTable = ({ suitability }) => {
  const suitableItems = suitability?.filter((item) => !item.includes("Not Suitable")) || [];
  const notSuitableItems = suitability?.filter((item) => item.includes("Not Suitable")) || [];

  return (
    <ResponsiveTable>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">Detail</th>
          </tr>
        </thead>
        <tbody>
          {suitableItems.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{item}</td>
            </tr>
          ))}
          {notSuitableItems.map((item, index) => (
            <tr key={`not-${index}`}>
              <td className="border px-4 py-2">
                <FaTimes className="mr-2 text-red-500 inline" /> {item}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ResponsiveTable>
  );
};

export const SizeTable = ({ size }) => {
  return (
    <ResponsiveTable>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">Size</th>
            <th className="px-4 py-2 text-left">Width</th>
            <th className="px-4 py-2 text-left">Length</th>
            <th className="px-4 py-2 text-left">Height</th>
          </tr>
        </thead>
        <tbody>
          {size && size.length > 0 && (
            <>
              <tr>
                <td className="border px-4 py-2 font-semibold whitespace-nowrap">
                  <FaRuler className="mr-2 text-blue-500 inline" /> Unit size
                </td>
                {size[0].split(",").map((elem, ind) => (
                  <td className="border px-4 py-2" key={ind}>{elem}</td>
                ))}
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold whitespace-nowrap">
                  <FaRuler className="mr-2 text-blue-500 inline" /> Required size
                </td>
                {size[1].split(",").map((elem, ind) => (
                  <td className="border px-4 py-2" key={ind}>{elem}</td>
                ))}
              </tr>
              {size[2] && (
                <tr>
                  <td className="border px-4 py-2 font-semibold whitespace-nowrap">
                    <FaRuler className="mr-2 text-blue-500 inline" /> Size in meters
                  </td>
                  {size[2].split(",").map((elem, ind) => (
                    <td className="border px-4 py-2" key={ind}>{elem}</td>
                  ))}
                </tr>
              )}
            </>
          )}
        </tbody>
      </table>
    </ResponsiveTable>
  );
};  