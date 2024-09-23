import React from 'react';
import { 
  FaCheck, 
  FaTimes, 
  FaHome, 
  FaTree, 
  FaRoad, 
  FaLeaf, 
  FaFlag,
  FaRuler
} from 'react-icons/fa';

export const InflatableDetailsTable = ({ suitability }) => {
  const suitableItems = suitability?.filter(item => !item.includes('Not Suitable')) || [];
  const notSuitableItems = suitability?.filter(item => item.includes('Not Suitable')) || [];

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">Detail</th>
            <th className="px-4 py-2 text-left">Information</th>
          </tr>
        </thead>
        <tbody>
          {/* Suitable items */}
          {suitableItems.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 font-semibold flex items-center">
                <FaCheck className="mr-2 text-green-500" /> Suitable for
              </td>
              <td className="border px-4 py-2 flex items-center">
                {item === 'Indoors on Hard Surface' && <FaHome className="mr-2 text-gray-600" />}
                {item === 'Outdoors on Grass' && <FaTree className="mr-2 text-green-600" />}
                {item === 'Outdoors on Hard Surface' && <FaRoad className="mr-2 text-gray-600" />}
                {item}
              </td>
            </tr>
          ))}

          {/* Not Suitable items */}
          {notSuitableItems.map((item, index) => (
            <tr key={`not-${index}`}>
              <td className="border px-4 py-2 font-semibold flex items-center">
                <FaTimes className="mr-2 text-red-500" /> Not Suitable for
              </td>
              <td className="border px-4 py-2 flex items-center">
                {item === 'Not Suitable For Outdoors on Artificial Grass' && <FaLeaf className="mr-2 text-green-400" />}
                {item === 'Not Suitable For Outdoors on Flags' && <FaFlag className="mr-2 text-blue-500" />}
                {item}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export const SizeTable = ({size})=>{
  // const suitabilityItems = suitability?.filter(item => typeof item === 'string') || [];
  // const notSuitableItems = suitability?.find(item => typeof item === 'object')?.Notsuitable || [];

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">Detail</th>
            <th className="px-4 py-2 text-left">Information</th>
          </tr>
        </thead>
        <tbody>
        
{size && size.length > 0 && (
  <tr>
    <td className="border px-4 py-2 font-semibold flex items-center">
      <FaRuler className="mr-2 text-blue-500" /> Size
    </td>
    <td className="border px-4 py-2">{size[0]}</td>
  </tr>
)}
        </tbody>
      </table>
    </div>
  );
}





