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
  FaChild,
  FaUser,
} from "react-icons/fa";

const ResponsiveTable = ({ children }) => (
  <div className="overflow-x-auto bg-white shadow-md rounded-lg">
    <div className="min-w-max">
      {children}
    </div>
  </div>
);

export const InflatableDetailsTable = ({ suitability }) => {
  const { suitable_for, suitable_surfaces, unsuitable_surfaces } = suitability;

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
          {/* Render people suitability */}
          {suitable_for?.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 font-semibold whitespace-nowrap">
                {item?.suitable  ? (
                  <FaCheck className="mr-2 text-green-500 inline" />
                ) : (
                  <FaTimes className="mr-2 text-red-500 inline" />
                )}
                {item?.suitable ? "Suitable for" : "Not Suitable for"}
              </td>
              <td className="border px-4 py-2">
                {item?.category === "Children" && <FaChild className="mr-2 text-yellow-500 inline" />}
                {item?.category === "Adults" && <FaUser className="mr-2 text-gray-600 inline" />}
                {item?.category}
              </td>
            </tr>
          ))}

          {/* Render suitable surfaces */}
          {suitable_surfaces?.map((surface, index) => (
            <tr key={`suitable-surface-${index}`}>
              <td className="border px-4 py-2 font-semibold whitespace-nowrap">
                <FaCheck className="mr-2 text-green-500 inline" /> Suitable for
              </td>
              <td className="border px-4 py-2">
                {surface === "Indoors on Hard Surface" && <FaHome className="mr-2 text-gray-600 inline" />}
                {surface === "Outdoors on Grass" && <FaTree className="mr-2 text-green-600 inline" />}
                {surface === "Outdoors on Hard Surface" && <FaRoad className="mr-2 text-gray-600 inline" />}
                {surface}
              </td>
            </tr>
          ))}

          {/* Render unsuitable surfaces */}
          {unsuitable_surfaces?.map((surface, index) => (
            <tr key={`unsuitable-surface-${index}`}>
              <td className="border px-4 py-2 font-semibold whitespace-nowrap">
                <FaTimes className="mr-2 text-red-500 inline" /> Not Suitable for
              </td>
              <td className="border px-4 py-2">
                {surface === "Outdoors on Artificial Grass" && <FaLeaf className="mr-2 text-green-400 inline" />}
                {surface === "Outdoors on Flags" && <FaFlag className="mr-2 text-blue-500 inline" />}
                {surface}
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



export const SizeTable = ({ size ,s}) => {
if(s === 's1'){
  return (
    <div className="p-4">
  <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-lg">
    <thead className="bg-indigo-600 text-white">
      <tr>
        <th className="px-6 py-3 border border-gray-300">Property</th>
        <th className="px-6 py-3 border border-gray-300">Imperial</th>
        <th className="px-6 py-3 border border-gray-300">Metric</th>
      </tr>
    </thead>
    <tbody>
      <tr className="bg-gray-50 hover:bg-gray-100 transition duration-300">
        <td className="px-6 py-4 border border-gray-300">Size</td>
        <td className="px-6 py-4 border border-gray-300">{size.imperial}</td>
        <td className="px-6 py-4 border border-gray-300">{size.metric}</td>
      </tr>
      <tr className="bg-white hover:bg-gray-100 transition duration-300">
        <td className="px-6 py-4 border border-gray-300">Required Space</td>
        <td className="px-6 py-4 border border-gray-300">{size.requiredSpace.imperial}</td>
        <td className="px-6 py-4 border border-gray-300">{size.requiredSpace.metric}</td>
      </tr>
      <tr className="bg-gray-50 hover:bg-gray-100 transition duration-300">
        <td className="px-6 py-4 border border-gray-300">Required Access Width</td>
        <td className="px-6 py-4 border border-gray-300">{size.requiredAccessWidth.imperial}</td>
        <td className="px-6 py-4 border border-gray-300">{size.requiredAccessWidth.metric}</td>
      </tr>
    </tbody>
  </table>
</div>
  )
}else if(s === 's2' || s ==='s3'){
  return (
    <div className="p-4">
    <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-lg">
      <thead className="bg-indigo-600 text-white">
        <tr>
          <th className="px-6 py-3 border border-gray-300">Property</th>
          <th className="px-6 py-3 border border-gray-300">Imperial</th>
          <th className="px-6 py-3 border border-gray-300">Metric</th>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-gray-50 hover:bg-gray-100 transition duration-300">
          <td className="px-6 py-4 border border-gray-300">Dimensions</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions[0].imperial}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions[0].metric}</td>
        </tr>
        <tr className="bg-white hover:bg-gray-100 transition duration-300">
          <td className="px-6 py-4 border border-gray-300">Required Space</td>
          <td className="px-6 py-4 border border-gray-300">{size.requiredSpace[0].imperial}</td>
          <td className="px-6 py-4 border border-gray-300">{size.requiredSpace[0].metric}</td>
        </tr>
        <tr className="bg-gray-50 hover:bg-gray-100 transition duration-300">
          <td className="px-6 py-4 border border-gray-300">Required Access Width</td>
          <td className="px-6 py-4 border border-gray-300">{size.requiredAccessWidth[0].imperial}</td>
          <td className="px-6 py-4 border border-gray-300">{size.requiredAccessWidth[0].metric}</td>
        </tr>
      </tbody>
    </table>
  </div>
  )
}else if(s ==='s4' || s ==='s5' || s==='s6' || s ==='s7' || s ==='s8' || s ==='s9' || s==='s10' || s ==='s11' || s ==='s12' || s ==='s13', s ==='s14',s==='s15' || s==='s16' || s==='s17' || s==='s18' || s==='s19' ||  s==='s21' || s==='s23' || s ==='s27' || s ==='s28' ){
  return (
    <div className="p-4">
      <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-lg">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="px-6 py-3 border border-gray-300">Property</th>
            <th className="px-6 py-3 border border-gray-300">Imperial</th>
            <th className="px-6 py-3 border border-gray-300">Metric</th>
          </tr>
        </thead>
        <tbody>
          {/* Unit Size Rows */}
          <tr className="bg-gray-50">
            <td className="px-6 py-4 border border-gray-300">Unit Size (Width)</td>
            <td className="px-6 py-4 border border-gray-300">
              {size.dimensions.unitSize.width}
            </td>
            <td className="px-6 py-4 border border-gray-300">
              {size.metricDimensions.unitSize.width}
            </td>
          </tr>
          <tr className="bg-white">
            <td className="px-6 py-4 border border-gray-300">Unit Size (Length)</td>
            <td className="px-6 py-4 border border-gray-300">
              {size.dimensions.unitSize.length}
            </td>
            <td className="px-6 py-4 border border-gray-300">
              {size.metricDimensions.unitSize.length}
            </td>
          </tr>
          <tr className="bg-gray-50">
            <td className="px-6 py-4 border border-gray-300">Unit Size (Height)</td>
            <td className="px-6 py-4 border border-gray-300">
              {size.dimensions.unitSize.height}
            </td>
            <td className="px-6 py-4 border border-gray-300">
              {size.metricDimensions.unitSize.height}
            </td>
          </tr>

          {/* Required Space Rows */}
          <tr className="bg-white">
            <td className="px-6 py-4 border border-gray-300">Required Space (Width)</td>
            <td className="px-6 py-4 border border-gray-300">
              {size.dimensions.requiredSpace.width}
            </td>
            <td className="px-6 py-4 border border-gray-300">
              {size.metricDimensions.requiredSpace.width}
            </td>
          </tr>
          <tr className="bg-gray-50">
            <td className="px-6 py-4 border border-gray-300">Required Space (Length)</td>
            <td className="px-6 py-4 border border-gray-300">
              {size.dimensions.requiredSpace.length}
            </td>
            <td className="px-6 py-4 border border-gray-300">
              {size.metricDimensions.requiredSpace.length}
            </td>
          </tr>
          <tr className="bg-white">
            <td className="px-6 py-4 border border-gray-300">Required Space (Height)</td>
            <td className="px-6 py-4 border border-gray-300">
              {size.dimensions.requiredSpace.height}
            </td>
            <td className="px-6 py-4 border border-gray-300">
              {size.metricDimensions.requiredSpace.height}
            </td>
          </tr>

          {/* Required Access Width */}
          <tr className="bg-gray-50">
            <td className="px-6 py-4 border border-gray-300">Required Access Width</td>
            <td className="px-6 py-4 border border-gray-300">
              {size.dimensions.requiredAccessWidth}
            </td>
            <td className="px-6 py-4 border border-gray-300">
              {size.metricDimensions.requiredAccessWidth}
            </td>
          </tr>

        
        </tbody>
      </table>
    </div>
  )
}else if(s === 's24'){
  return (
    <div className="p-4">
      <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-lg">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="px-6 py-3 border border-gray-300">Unit</th>
            <th className="px-6 py-3 border border-gray-300">Dimensions</th>
            <th className="px-6 py-3 border border-gray-300">Required Space</th>
            <th className="px-6 py-3 border border-gray-300">Slide Platform Height</th>
          </tr>
        </thead>
        <tbody>
          {/* Row for Juniors Inflatable Bouncy Slide */}
          <tr className="bg-gray-50">
            <td className="px-6 py-4 border border-gray-300">
              Juniors Inflatable Bouncy Slide
            </td>
            <td className="px-6 py-4 border border-gray-300">
              12ft x 12ft x 8ft
            </td>
            <td className="px-6 py-4 border border-gray-300">
              15ft x 17ft x 9ft
            </td>
            <td className="px-6 py-4 border border-gray-300">
              5ft
            </td>
          </tr>

          {/* Row for Juniors Inflatable Bouncy Slide (Metric) */}
          <tr className="bg-white">
            <td className="px-6 py-4 border border-gray-300">
              Juniors Inflatable Bouncy Slide (metric)
            </td>
            <td className="px-6 py-4 border border-gray-300">
              3.7m x 3.7m x 2.4m
            </td>
            <td className="px-6 py-4 border border-gray-300">
              4.6m x 5.2m x 2.7m
            </td>
            <td className="px-6 py-4 border border-gray-300">
              1.5m
            </td>
          </tr>

          {/* Row for Mermaids Bouncy Castle */}
          <tr className="bg-gray-50">
            <td className="px-6 py-4 border border-gray-300">
              Mermaids Bouncy Castle
            </td>
            <td className="px-6 py-4 border border-gray-300">
              9.0ft x 11.5ft x 8.0ft
            </td>
            <td className="px-6 py-4 border border-gray-300">
              12.0ft x 17.0ft x 8.5ft
            </td>
            <td className="px-6 py-4 border border-gray-300">
              N/A
            </td>
          </tr>

          {/* Row for Mermaids Bouncy Castle (Metric) */}
          <tr className="bg-white">
            <td className="px-6 py-4 border border-gray-300">
              Mermaids Bouncy Castle (metric)
            </td>
            <td className="px-6 py-4 border border-gray-300">
              2.7m x 3.5m x 2.4m
            </td>
            <td className="px-6 py-4 border border-gray-300">
              3.7m x 5.2m x 2.6m
            </td>
            <td className="px-6 py-4 border border-gray-300">
              N/A
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}else if(s ==='s25'){
  return  <div className="p-4">
  <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-lg">
    <thead className="bg-indigo-600 text-white">
      <tr>
        <th className="px-6 py-3 border border-gray-300">Dimension</th>
        <th className="px-6 py-3 border border-gray-300">Width</th>
        <th className="px-6 py-3 border border-gray-300">Length</th>
        <th className="px-6 py-3 border border-gray-300">Height</th>
      </tr>
    </thead>
    <tbody>
      {/* Row for Imperial Sizes */}
      <tr className="bg-gray-50">
        <td className="px-6 py-4 border border-gray-300">Imperial (ft)</td>
        <td className="px-6 py-4 border border-gray-300">{size.unitSize[0]}</td>
        <td className="px-6 py-4 border border-gray-300">{size.unitSize[1]}</td>
        <td className="px-6 py-4 border border-gray-300">{size.unitSize[2]}</td>
      </tr>

      {/* Row for Metric Sizes */}
      <tr className="bg-white">
        <td className="px-6 py-4 border border-gray-300">Metric (m)</td>
        <td className="px-6 py-4 border border-gray-300">{size.sizeInMeter[0]}</td>
        <td className="px-6 py-4 border border-gray-300">{size.sizeInMeter[1]}</td>
        <td className="px-6 py-4 border border-gray-300">{size.sizeInMeter[2]}</td>
      </tr>
    </tbody>
  </table>
</div>
}else if(s === 's26'){
  return (
    <div className="p-4">
    <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-lg">
      <thead className="bg-indigo-600 text-white">
        <tr>
          <th className="px-6 py-3 border border-gray-300">Property</th>
          <th className="px-6 py-3 border border-gray-300">Width</th>
          <th className="px-6 py-3 border border-gray-300">Length</th>
          <th className="px-6 py-3 border border-gray-300">Height</th>
          <th className="px-6 py-3 border border-gray-300">Slide Platform Height</th>
        </tr>
      </thead>
      <tbody>
        {/* Row for Unit Size (Imperial) */}
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Unit Size (Imperial)</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.unitSize.imperial.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.unitSize.imperial.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.unitSize.imperial.height}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.unitSize.slidePlatformHeight.imperial}</td>
        </tr>

        {/* Row for Unit Size (Metric) */}
        <tr className="bg-white">
          <td className="px-6 py-4 border border-gray-300">Unit Size (Metric)</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.unitSize.metric.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.unitSize.metric.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.unitSize.metric.height}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.unitSize.slidePlatformHeight.metric}</td>
        </tr>

        {/* Row for Required Space (Imperial) */}
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Required Space (Imperial)</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.requiredSpace.imperial.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.requiredSpace.imperial.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.requiredSpace.imperial.height}</td>
          <td className="px-6 py-4 border border-gray-300">-</td>
        </tr>

        {/* Row for Required Space (Metric) */}
        <tr className="bg-white">
          <td className="px-6 py-4 border border-gray-300">Required Space (Metric)</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.requiredSpace.metric.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.requiredSpace.metric.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.requiredSpace.metric.height}</td>
          <td className="px-6 py-4 border border-gray-300">-</td>
        </tr>
      </tbody>
    </table>
  </div>
  )
}else if(s === 's29'){
  return (
    <div className="p-4">
    <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-lg">
      <thead className="bg-indigo-600 text-white">
        <tr>
          <th className="px-6 py-3 border border-gray-300">Property</th>
          <th className="px-6 py-3 border border-gray-300">Width</th>
          <th className="px-6 py-3 border border-gray-300">Length</th>
          <th className="px-6 py-3 border border-gray-300">Access Width</th>
        </tr>
      </thead>
      <tbody>
        {/* Row for Required Space (Imperial) */}
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Required Space (Imperial)</td>
          <td className="px-6 py-4 border border-gray-300">{size.requiredSpace.imperial.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.requiredSpace.imperial.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.requiredAccessWidth.imperial}</td>
        </tr>

        {/* Row for Required Space (Metric) */}
        <tr className="bg-white">
          <td className="px-6 py-4 border border-gray-300">Required Space (Metric)</td>
          <td className="px-6 py-4 border border-gray-300">{size.requiredSpace.metric.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.requiredSpace.metric.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.requiredAccessWidth.metric}</td>
        </tr>
      </tbody>
    </table>
  </div>
  )
}else if(s ==='s30'){
  return (
    <div className="p-4">
    <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-lg">
      <thead className="bg-indigo-600 text-white">
        <tr>
          <th className="px-6 py-3 border border-gray-300">Property</th>
          <th className="px-6 py-3 border border-gray-300">Imperial Width</th>
          <th className="px-6 py-3 border border-gray-300">Imperial Length</th>
          <th className="px-6 py-3 border border-gray-300">Imperial Height</th>
          <th className="px-6 py-3 border border-gray-300">Metric Width</th>
          <th className="px-6 py-3 border border-gray-300">Metric Length</th>
          <th className="px-6 py-3 border border-gray-300">Metric Height</th>
        </tr>
      </thead>
      <tbody>
        {/* Row for Unit Size (Imperial) */}
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Unit Size (Imperial)</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.unitSize.imperial.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.unitSize.imperial.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.unitSize.imperial.height}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.unitSize.metric.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.unitSize.metric.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.unitSize.metric.height}</td>
        </tr>

        {/* Row for Required Space (Imperial) */}
        <tr className="bg-white">
          <td className="px-6 py-4 border border-gray-300">Required Space (Imperial)</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.requiredSpace.imperial.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.requiredSpace.imperial.length}</td>
          <td className="px-6 py-4 border border-gray-300">N/A</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.requiredSpace.metric.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.requiredSpace.metric.length}</td>
          <td className="px-6 py-4 border border-gray-300">N/A</td>
        </tr>
      </tbody>
    </table>
  </div>
  )
}else if(s === 's31'){
  return (
    <div className="p-4">
    <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-lg">
      <thead className="bg-indigo-600 text-white">
        <tr>
          <th className="px-6 py-3 border border-gray-300">Measurement Type</th>
          <th className="px-6 py-3 border border-gray-300">Width</th>
          <th className="px-6 py-3 border border-gray-300">Length</th>
          <th className="px-6 py-3 border border-gray-300">Height</th>
        </tr>
      </thead>
      <tbody>
        {/* Row for Dimensions (Imperial) */}
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Dimensions (Imperial)</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.imperial.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.imperial.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.imperial.height}</td>
        </tr>

        {/* Row for Dimensions (Metric) */}
        <tr className="bg-white">
          <td className="px-6 py-4 border border-gray-300">Dimensions (Metric)</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.metric.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.metric.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.metric.height}</td>
        </tr>

        {/* Row for Required Space (Imperial) */}
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Required Space (Imperial)</td>
          <td className="px-6 py-4 border border-gray-300">{size.requiredSpace.imperial.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.requiredSpace.imperial.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.requiredSpace.imperial.height}</td>
        </tr>

        {/* Row for Required Space (Metric) */}
        <tr className="bg-white">
          <td className="px-6 py-4 border border-gray-300">Required Space (Metric)</td>
          <td className="px-6 py-4 border border-gray-300">{size.requiredSpace.metric.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.requiredSpace.metric.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.requiredSpace.metric.height}</td>
        </tr>

        {/* Row for Required Access Width */}
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Required Access Width</td>
          <td className="px-6 py-4 border border-gray-300">{size.requiredAccessWidth.imperial}</td>
          <td className="px-6 py-4 border border-gray-300">{size.requiredAccessWidth.metric}</td>
          <td className="px-6 py-4 border border-gray-300">N/A</td>
        </tr>
      </tbody>
    </table>
  </div>
  )
}else if(s ==='s32'|| s==='s33'){
  return (
    <div className="p-4">
    <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-lg">
      <thead className="bg-indigo-600 text-white">
        <tr>
          <th className="px-6 py-3 border border-gray-300">Item</th>
          <th className="px-6 py-3 border border-gray-300">Measurement Type</th>
          <th className="px-6 py-3 border border-gray-300">Width</th>
          <th className="px-6 py-3 border border-gray-300">Length</th>
          <th className="px-6 py-3 border border-gray-300">Height</th>
          <th className="px-6 py-3 border border-gray-300">Platform Height</th>
        </tr>
      </thead>
      <tbody>
        {/* Row for Junior Slide (Imperial) */}
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Juniors Inflatable Bouncy Slide (Imperial)</td>
          <td className="px-6 py-4 border border-gray-300">Dimensions</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.juniorSlide.imperial.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.juniorSlide.imperial.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.juniorSlide.imperial.height}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.juniorSlide.imperial.platformHeight}</td>
        </tr>

        {/* Row for Junior Slide Required Space (Imperial) */}
        <tr className="bg-white">
          <td className="px-6 py-4 border border-gray-300">Juniors Inflatable Bouncy Slide (Imperial)</td>
          <td className="px-6 py-4 border border-gray-300">Required Space</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.juniorSlide.requiredSpace.imperial.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.juniorSlide.requiredSpace.imperial.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.juniorSlide.requiredSpace.imperial.height}</td>
          <td className="px-6 py-4 border border-gray-300">N/A</td>
        </tr>

        {/* Row for Junior Slide (Metric) */}
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Juniors Inflatable Bouncy Slide (Metric)</td>
          <td className="px-6 py-4 border border-gray-300">Dimensions</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.juniorSlide.metric.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.juniorSlide.metric.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.juniorSlide.metric.height}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.juniorSlide.metric.platformHeight}</td>
        </tr>

        {/* Row for Bouncy Castle (Imperial) */}
        <tr className="bg-white">
          <td className="px-6 py-4 border border-gray-300">Mermaids Bouncy Castle (Imperial)</td>
          <td className="px-6 py-4 border border-gray-300">Dimensions</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.height}</td>
          <td className="px-6 py-4 border border-gray-300">N/A</td>
        </tr>

        {/* Row for Bouncy Castle Required Space (Imperial) */}
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Mermaids Bouncy Castle (Imperial)</td>
          <td className="px-6 py-4 border border-gray-300">Required Space</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.requiredSpace.imperial.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.requiredSpace.imperial.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.requiredSpace.imperial.height}</td>
          <td className="px-6 py-4 border border-gray-300">N/A</td>
        </tr>

        {/* Row for Bouncy Castle (Metric) */}
        <tr className="bg-white">
          <td className="px-6 py-4 border border-gray-300">Mermaids Bouncy Castle (Metric)</td>
          <td className="px-6 py-4 border border-gray-300">Dimensions</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.height}</td>
          <td className="px-6 py-4 border border-gray-300">N/A</td>
        </tr>

        {/* Row for Bouncy Castle Required Space (Metric) */}
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Mermaids Bouncy Castle (Metric)</td>
          <td className="px-6 py-4 border border-gray-300">Required Space</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.requiredSpace.metric.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.requiredSpace.metric.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.requiredSpace.metric.height}</td>
          <td className="px-6 py-4 border border-gray-300">N/A</td>
        </tr>
      </tbody>
    </table>
  </div>
  )
}else if(s === 's34'){
  return (
    <div className="p-4">
    <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-lg">
      <thead className="bg-indigo-600 text-white">
        <tr>
          <th className="px-6 py-3 border border-gray-300">Item</th>
          <th className="px-6 py-3 border border-gray-300">Measurement Type</th>
          <th className="px-6 py-3 border border-gray-300">Width</th>
          <th className="px-6 py-3 border border-gray-300">Length</th>
          <th className="px-6 py-3 border border-gray-300">Height</th>
          <th className="px-6 py-3 border border-gray-300">Platform Height</th>
        </tr>
      </thead>
      <tbody>
        {/* Row for Junior Slide (Imperial) */}
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Junior Inflatable Bouncy Slide (Imperial)</td>
          <td className="px-6 py-4 border border-gray-300">Dimensions</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.juniorSlide.imperial.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.juniorSlide.imperial.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.juniorSlide.imperial.height}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.juniorSlide.imperial.platformHeight}</td>
        </tr>

        {/* Row for Junior Slide (Metric) */}
        <tr className="bg-white">
          <td className="px-6 py-4 border border-gray-300">Junior Inflatable Bouncy Slide (Metric)</td>
          <td className="px-6 py-4 border border-gray-300">Dimensions</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.juniorSlide.metric.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.juniorSlide.metric.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.juniorSlide.metric.height}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.juniorSlide.metric.platformHeight}</td>
        </tr>

        {/* Row for Bouncy Castle (Imperial) */}
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Bouncy Castle (Imperial)</td>
          <td className="px-6 py-4 border border-gray-300">Dimensions</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.height}</td>
          <td className="px-6 py-4 border border-gray-300">N/A</td>
        </tr>

        {/* Row for Bouncy Castle (Metric) */}
        <tr className="bg-white">
          <td className="px-6 py-4 border border-gray-300">Bouncy Castle (Metric)</td>
          <td className="px-6 py-4 border border-gray-300">Dimensions</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.height}</td>
          <td className="px-6 py-4 border border-gray-300">N/A</td>
        </tr>

        {/* Row for Bouncy Castle Required Space (Imperial) */}
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Bouncy Castle (Imperial)</td>
          <td className="px-6 py-4 border border-gray-300">Required Space</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.requiredSpace.imperial.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.requiredSpace.imperial.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.requiredSpace.imperial.height}</td>
          <td className="px-6 py-4 border border-gray-300">N/A</td>
        </tr>

        {/* Row for Bouncy Castle Required Space (Metric) */}
        <tr className="bg-white">
          <td className="px-6 py-4 border border-gray-300">Bouncy Castle (Metric)</td>
          <td className="px-6 py-4 border border-gray-300">Required Space</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.requiredSpace.metric.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.requiredSpace.metric.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.requiredSpace.metric.height}</td>
          <td className="px-6 py-4 border border-gray-300">N/A</td>
        </tr>
      </tbody>
    </table>
  </div>
  )
}else if(s ==='s35'){
  return (
    <div className="p-4">
    <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-lg">
      <thead className="bg-indigo-600 text-white">
        <tr>
          <th className="px-6 py-3 border border-gray-300">Item</th>
          <th className="px-6 py-3 border border-gray-300">Measurement Type</th>
          <th className="px-6 py-3 border border-gray-300">Width</th>
          <th className="px-6 py-3 border border-gray-300">Length</th>
          <th className="px-6 py-3 border border-gray-300">Height</th>
          <th className="px-6 py-3 border border-gray-300">Required Space Width</th>
          <th className="px-6 py-3 border border-gray-300">Required Space Length</th>
          <th className="px-6 py-3 border border-gray-300">Required Space Height</th>
          <th className="px-6 py-3 border border-gray-300">Access Width</th>
          <th className="px-6 py-3 border border-gray-300">Description</th>
        </tr>
      </thead>
      <tbody>
        {/* Row for Toddlers Bouncy Castle (Imperial) */}
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Toddlers Bouncy Castle (Imperial)</td>
          <td className="px-6 py-4 border border-gray-300">Dimensions</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.toddlersBouncyCastle.imperial.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.toddlersBouncyCastle.imperial.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.toddlersBouncyCastle.imperial.height}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.toddlersBouncyCastle.imperial.requiredSpace.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.toddlersBouncyCastle.imperial.requiredSpace.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.toddlersBouncyCastle.imperial.requiredSpace.height}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.toddlersBouncyCastle.imperial.accessWidth}</td>
          <td className="px-6 py-4 border border-gray-300">N/A</td>
        </tr>

        {/* Row for Toddlers Bouncy Castle (Metric) */}
        <tr className="bg-white">
          <td className="px-6 py-4 border border-gray-300">Toddlers Bouncy Castle (Metric)</td>
          <td className="px-6 py-4 border border-gray-300">Dimensions</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.toddlersBouncyCastle.metric.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.toddlersBouncyCastle.metric.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.toddlersBouncyCastle.metric.height}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.toddlersBouncyCastle.metric.requiredSpace.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.toddlersBouncyCastle.metric.requiredSpace.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.toddlersBouncyCastle.metric.requiredSpace.height}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.toddlersBouncyCastle.metric.accessWidth}</td>
          <td className="px-6 py-4 border border-gray-300">N/A</td>
        </tr>

        {/* Row for Ball Pool */}
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Ball Pool</td>
          <td className="px-6 py-4 border border-gray-300" colSpan={9}>{size.ballPool}</td>
        </tr>

        {/* Row for Soft Play */}
        <tr className="bg-white">
          <td className="px-6 py-4 border border-gray-300">Soft Play</td>
          <td className="px-6 py-4 border border-gray-300" colSpan={9}>{size.softPlay}</td>
        </tr>
      </tbody>
    </table>
  </div>
  )
}else if(s === 's36'){
  return (
    <div className="p-4">
    <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-lg">
      <thead className="bg-indigo-600 text-white">
        <tr>
          <th className="px-6 py-3 border border-gray-300">Item</th>
          <th className="px-6 py-3 border border-gray-300">Measurement Type</th>
          <th className="px-6 py-3 border border-gray-300">Width</th>
          <th className="px-6 py-3 border border-gray-300">Length</th>
          <th className="px-6 py-3 border border-gray-300">Height</th>
          <th className="px-6 py-3 border border-gray-300">Required Space Width</th>
          <th className="px-6 py-3 border border-gray-300">Required Space Length</th>
          <th className="px-6 py-3 border border-gray-300">Required Space Height</th>
        </tr>
      </thead>
      <tbody>
        {/* Row for Juniors Bouncy Castle (Imperial) */}
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Juniors Bouncy Castle (Imperial)</td>
          <td className="px-6 py-4 border border-gray-300">Dimensions</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.juniorsBouncyCastle.imperial.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.juniorsBouncyCastle.imperial.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.juniorsBouncyCastle.imperial.height}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.juniorsBouncyCastle.imperial.requiredSpace.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.juniorsBouncyCastle.imperial.requiredSpace.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.juniorsBouncyCastle.imperial.requiredSpace.height}</td>
        </tr>

        {/* Row for Juniors Bouncy Castle (Metric) */}
        <tr className="bg-white">
          <td className="px-6 py-4 border border-gray-300">Juniors Bouncy Castle (Metric)</td>
          <td className="px-6 py-4 border border-gray-300">Dimensions</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.juniorsBouncyCastle.metric.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.juniorsBouncyCastle.metric.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.juniorsBouncyCastle.metric.height}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.juniorsBouncyCastle.metric.requiredSpace.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.juniorsBouncyCastle.metric.requiredSpace.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.juniorsBouncyCastle.metric.requiredSpace.height}</td>
        </tr>

        {/* Row for Ball Pool */}
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Ball Pool</td>
          <td className="px-6 py-4 border border-gray-300" colSpan={7}>{size.ballPool}</td>
        </tr>

        {/* Row for Foam Ball Pool */}
        <tr className="bg-white">
          <td className="px-6 py-4 border border-gray-300">Foam Ball Pool</td>
          <td className="px-6 py-4 border border-gray-300" colSpan={7}>{size.foamBallPool}</td>
        </tr>

        {/* Row for Soft Play */}
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Soft Play</td>
          <td className="px-6 py-4 border border-gray-300" colSpan={7}>{size.softPlay}</td>
        </tr>
      </tbody>
    </table>
  </div>
  )
}else if(s ==='s37' || s==='s38'){
  return (
    <div className="p-4">
    <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-lg">
      <thead className="bg-green-600 text-white">
        <tr>
          <th className="px-6 py-3 border border-gray-300">Item</th>
          <th className="px-6 py-3 border border-gray-300">Measurement Type</th>
          <th className="px-6 py-3 border border-gray-300">Width</th>
          <th className="px-6 py-3 border border-gray-300">Length</th>
          <th className="px-6 py-3 border border-gray-300">Height</th>
          <th className="px-6 py-3 border border-gray-300">Required Space Width</th>
          <th className="px-6 py-3 border border-gray-300">Required Space Length</th>
          <th className="px-6 py-3 border border-gray-300">Required Space Height</th>
        </tr>
      </thead>
      <tbody>
        {/* Row for Bouncy Castle (Imperial) */}
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Bouncy Castle (Imperial)</td>
          <td className="px-6 py-4 border border-gray-300">Dimensions</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.height}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.requiredSpace.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.requiredSpace.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.requiredSpace.height}</td>
        </tr>

        {/* Row for Bouncy Castle (Metric) */}
        <tr className="bg-white">
          <td className="px-6 py-4 border border-gray-300">Bouncy Castle (Metric)</td>
          <td className="px-6 py-4 border border-gray-300">Dimensions</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.height}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.requiredSpace.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.requiredSpace.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.requiredSpace.height}</td>
        </tr>

        {/* Row for Ball Pool */}
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Ball Pool</td>
          <td className="px-6 py-4 border border-gray-300" colSpan={7}>{size.ballPool}</td>
        </tr>

        {/* Row for Soft Play */}
        <tr className="bg-white">
          <td className="px-6 py-4 border border-gray-300">Soft Play</td>
          <td className="px-6 py-4 border border-gray-300" colSpan={7}>{size.softPlay}</td>
        </tr>
      </tbody>
    </table>
  </div>
  )
}else if(s === 's39' || s==='s40'||s==='s41'){
  return (
    <div className="p-4">
    <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-lg">
      <thead className="bg-green-600 text-white">
        <tr>
          <th className="px-6 py-3 border border-gray-300">Item</th>
          <th className="px-6 py-3 border border-gray-300">Measurement Type</th>
          <th className="px-6 py-3 border border-gray-300">Width</th>
          <th className="px-6 py-3 border border-gray-300">Length</th>
          <th className="px-6 py-3 border border-gray-300">Height</th>
          <th className="px-6 py-3 border border-gray-300">Required Space Width</th>
          <th className="px-6 py-3 border border-gray-300">Required Space Length</th>
          <th className="px-6 py-3 border border-gray-300">Required Space Height</th>
          <th className="px-6 py-3 border border-gray-300">Slide Platform Height</th>
        </tr>
      </thead>
      <tbody>
        {/* Row for Bouncy Castle (Imperial) */}
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Bouncy Castle (Imperial)</td>
          <td className="px-6 py-4 border border-gray-300">Dimensions</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.height}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.requiredSpace.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.requiredSpace.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.requiredSpace.height}</td>
          <td className="px-6 py-4 border border-gray-300"></td>
        </tr>

        {/* Row for Bouncy Castle (Metric) */}
        <tr className="bg-white">
          <td className="px-6 py-4 border border-gray-300">Bouncy Castle (Metric)</td>
          <td className="px-6 py-4 border border-gray-300">Dimensions</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.height}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.requiredSpace.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.requiredSpace.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.requiredSpace.height}</td>
          <td className="px-6 py-4 border border-gray-300"></td>
        </tr>

        {/* Row for Slide (Imperial) */}
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Slide (Imperial)</td>
          <td className="px-6 py-4 border border-gray-300">Dimensions</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.slide.imperial.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.slide.imperial.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.slide.imperial.height}</td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.slide.imperial.slidePlatformHeight}</td>
        </tr>

        {/* Row for Slide (Metric) */}
        <tr className="bg-white">
          <td className="px-6 py-4 border border-gray-300">Slide (Metric)</td>
          <td className="px-6 py-4 border border-gray-300">Dimensions</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.slide.metric.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.slide.metric.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.slide.metric.height}</td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.slide.metric.slidePlatformHeight}</td>
        </tr>

        {/* Row for Foam Ball Pool */}
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Foam Ball Pool</td>
          <td className="px-6 py-4 border border-gray-300" colSpan={8}>{size.dimensions.foamBallPool}</td>
        </tr>

        {/* Row for Soft Play */}
        <tr className="bg-white">
          <td className="px-6 py-4 border border-gray-300">Soft Play</td>
          <td className="px-6 py-4 border border-gray-300" colSpan={8}>{size.dimensions.softPlay}</td>
        </tr>
      </tbody>
    </table>
  </div>
  )
}else if(s === 's42' || s ==='s43'||s === 's44'){
  return (
    <div className="p-4">
    <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-lg">
      <thead className="bg-green-600 text-white">
        <tr>
          <th className="px-6 py-3 border border-gray-300">Item</th>
          <th className="px-6 py-3 border border-gray-300">Measurement Type</th>
          <th className="px-6 py-3 border border-gray-300">Width</th>
          <th className="px-6 py-3 border border-gray-300">Length</th>
          <th className="px-6 py-3 border border-gray-300">Height</th>
          <th className="px-6 py-3 border border-gray-300">Required Space Width</th>
          <th className="px-6 py-3 border border-gray-300">Required Space Length</th>
          <th className="px-6 py-3 border border-gray-300">Required Space Height</th>
          <th className="px-6 py-3 border border-gray-300">Suitability</th>
        </tr>
      </thead>
      <tbody>
        {/* Row for Bouncy Castle (Imperial) */}
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Bouncy Castle (Imperial)</td>
          <td className="px-6 py-4 border border-gray-300">Dimensions</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.height}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.requiredSpace.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.requiredSpace.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.requiredSpace.height}</td>
          <td className="px-6 py-4 border border-gray-300"></td>
        </tr>

        {/* Row for Bouncy Castle (Metric) */}
        <tr className="bg-white">
          <td className="px-6 py-4 border border-gray-300">Bouncy Castle (Metric)</td>
          <td className="px-6 py-4 border border-gray-300">Dimensions</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.height}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.requiredSpace.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.requiredSpace.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.requiredSpace.height}</td>
          <td className="px-6 py-4 border border-gray-300"></td>
        </tr>

        {/* Row for Foam Ball Pool */}
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Foam Ball Pool</td>
          <td className="px-6 py-4 border border-gray-300" colSpan={8}>
            {size.dimensions.foamBallPool.suitability.join(", ")}
          </td>
        </tr>

        {/* Row for Soft Play */}
        <tr className="bg-white">
          <td className="px-6 py-4 border border-gray-300">Soft Play</td>
          <td className="px-6 py-4 border border-gray-300" colSpan={8}>
            {size.dimensions.softPlay.suitability.join(", ")}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  )
}else if(s === 's45'){
  return (
    <div className="p-4">
    <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-lg">
      <thead className="bg-green-600 text-white">
        <tr>
          <th className="px-6 py-3 border border-gray-300">Item</th>
          <th className="px-6 py-3 border border-gray-300">Measurement Type</th>
          <th className="px-6 py-3 border border-gray-300">Width</th>
          <th className="px-6 py-3 border border-gray-300">Length</th>
          <th className="px-6 py-3 border border-gray-300">Height</th>
          <th className="px-6 py-3 border border-gray-300">Required Space Width</th>
          <th className="px-6 py-3 border border-gray-300">Required Space Length</th>
          <th className="px-6 py-3 border border-gray-300">Required Space Height</th>
          <th className="px-6 py-3 border border-gray-300">Access Width</th>
          <th className="px-6 py-3 border border-gray-300">Platform Height</th>
        </tr>
      </thead>
      <tbody>
        {/* Row for Bouncy Castle (Imperial) */}
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Bouncy Castle (Imperial)</td>
          <td className="px-6 py-4 border border-gray-300">Dimensions</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.height}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.requiredSpace.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.requiredSpace.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.requiredSpace.height}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.accessWidth}</td>
          <td className="px-6 py-4 border border-gray-300"></td>
        </tr>

        {/* Row for Bouncy Castle (Metric) */}
        <tr className="bg-white">
          <td className="px-6 py-4 border border-gray-300">Bouncy Castle (Metric)</td>
          <td className="px-6 py-4 border border-gray-300">Dimensions</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.height}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.requiredSpace.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.requiredSpace.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.requiredSpace.height}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.accessWidth}</td>
          <td className="px-6 py-4 border border-gray-300"></td>
        </tr>

        {/* Row for Slide (Imperial) */}
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Slide (Imperial)</td>
          <td className="px-6 py-4 border border-gray-300">Dimensions</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.slide.imperial.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.slide.imperial.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.slide.imperial.height}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.slide.imperial.requiredSpace.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.slide.imperial.requiredSpace.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.slide.imperial.requiredSpace.height}</td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.slide.imperial.platformHeight}</td>
        </tr>

        {/* Row for Slide (Metric) */}
        <tr className="bg-white">
          <td className="px-6 py-4 border border-gray-300">Slide (Metric)</td>
          <td className="px-6 py-4 border border-gray-300">Dimensions</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.slide.metric.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.slide.metric.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.slide.metric.height}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.slide.metric.requiredSpace.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.slide.metric.requiredSpace.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.slide.metric.requiredSpace.height}</td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.slide.metric.platformHeight}</td>
        </tr>
      </tbody>
    </table>
  </div>
  )
}else if(s === 's46'){
  return (
    <div className="p-4">
    <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-lg">
      <thead className="bg-green-600 text-white">
        <tr>
          <th className="px-6 py-3 border border-gray-300">Item</th>
          <th className="px-6 py-3 border border-gray-300">Measurement Type</th>
          <th className="px-6 py-3 border border-gray-300">Width</th>
          <th className="px-6 py-3 border border-gray-300">Length</th>
          <th className="px-6 py-3 border border-gray-300">Height</th>
          <th className="px-6 py-3 border border-gray-300">Required Space Width</th>
          <th className="px-6 py-3 border border-gray-300">Required Space Length</th>
          <th className="px-6 py-3 border border-gray-300">Required Space Height</th>
          <th className="px-6 py-3 border border-gray-300">Access Width</th>
          <th className="px-6 py-3 border border-gray-300">Mat Size</th>
          <th className="px-6 py-3 border border-gray-300">PCS</th>
          <th className="px-6 py-3 border border-gray-300">Suitable For</th>
        </tr>
      </thead>
      <tbody>
        {/* Row for Bouncy Castle (Imperial) */}
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Bouncy Castle (Imperial)</td>
          <td className="px-6 py-4 border border-gray-300">Dimensions</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.height}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.requiredSpace.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.requiredSpace.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.requiredSpace.height}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.accessWidth}</td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
        </tr>

        {/* Row for Bouncy Castle (Metric) */}
        <tr className="bg-white">
          <td className="px-6 py-4 border border-gray-300">Bouncy Castle (Metric)</td>
          <td className="px-6 py-4 border border-gray-300">Dimensions</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.height}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.requiredSpace.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.requiredSpace.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.requiredSpace.height}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.accessWidth}</td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
        </tr>

        {/* Row for Foam Ball Pool (Imperial) */}
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Foam Ball Pool (Imperial)</td>
          <td className="px-6 py-4 border border-gray-300">Dimensions</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.foamBallPool.imperial.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.foamBallPool.imperial.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.foamBallPool.imperial.height}</td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.foamBallPool.imperial.suitableFor}</td>
        </tr>

        {/* Row for Foam Ball Pool (Metric) */}
        <tr className="bg-white">
          <td className="px-6 py-4 border border-gray-300">Foam Ball Pool (Metric)</td>
          <td className="px-6 py-4 border border-gray-300">Dimensions</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.foamBallPool.metric.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.foamBallPool.metric.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.foamBallPool.metric.height}</td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.foamBallPool.metric.suitableFor}</td>
        </tr>

        {/* Row for Soft Play (Imperial) */}
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Soft Play (Imperial)</td>
          <td className="px-6 py-4 border border-gray-300">Dimensions</td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.softPlay.imperial.matSize}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.softPlay.imperial.pcs}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.softPlay.imperial.suitableFor}</td>
        </tr>

        {/* Row for Soft Play (Metric) */}
        <tr className="bg-white">
          <td className="px-6 py-4 border border-gray-300">Soft Play (Metric)</td>
          <td className="px-6 py-4 border border-gray-300">Dimensions</td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.softPlay.metric.matSize}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.softPlay.metric.pcs}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.softPlay.metric.suitableFor}</td>
        </tr>
      </tbody>
    </table>
  </div>
  )
}else if(s ==='s47'|| s=== 's48'){
  return (
    <div className="overflow-x-auto">
    <table className="min-w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-6 py-4 border border-gray-300">Item</th>
          <th className="px-6 py-4 border border-gray-300">Measurement</th>
          <th className="px-6 py-4 border border-gray-300">Width</th>
          <th className="px-6 py-4 border border-gray-300">Length</th>
          <th className="px-6 py-4 border border-gray-300">Height</th>
          <th className="px-6 py-4 border border-gray-300">Required Space (Width)</th>
          <th className="px-6 py-4 border border-gray-300">Required Space (Length)</th>
          <th className="px-6 py-4 border border-gray-300">Required Space (Height)</th>
          <th className="px-6 py-4 border border-gray-300">Access Width</th>
          <th className="px-6 py-4 border border-gray-300">Suitable For</th>
        </tr>
      </thead>
      <tbody>
        {/* Bouncy Castle (Imperial) */}
        <tr className="bg-white">
          <td className="px-6 py-4 border border-gray-300">Bouncy Castle</td>
          <td className="px-6 py-4 border border-gray-300">Imperial</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.height}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.requiredSpace.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.requiredSpace.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.requiredSpace.height}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.accessWidth}</td>
          <td className="px-6 py-4 border border-gray-300"></td>
        </tr>

        {/* Bouncy Castle (Metric) */}
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Bouncy Castle</td>
          <td className="px-6 py-4 border border-gray-300">Metric</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.height}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.requiredSpace.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.requiredSpace.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.requiredSpace.height}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.accessWidth}</td>
          <td className="px-6 py-4 border border-gray-300"></td>
        </tr>

        {/* Foam Ball Pool (Imperial) */}
        <tr className="bg-white">
          <td className="px-6 py-4 border border-gray-300">Foam Ball Pool</td>
          <td className="px-6 py-4 border border-gray-300">Imperial</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.foamBallPool.imperial.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.foamBallPool.imperial.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.foamBallPool.imperial.height}</td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.foamBallPool.imperial.suitableFor}</td>
        </tr>

        {/* Foam Ball Pool (Metric) */}
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Foam Ball Pool</td>
          <td className="px-6 py-4 border border-gray-300">Metric</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.foamBallPool.metric.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.foamBallPool.metric.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.foamBallPool.metric.height}</td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.foamBallPool.metric.suitableFor}</td>
        </tr>

        {/* Soft Play (Imperial) */}
        <tr className="bg-white">
          <td className="px-6 py-4 border border-gray-300">Soft Play</td>
          <td className="px-6 py-4 border border-gray-300">Imperial</td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.softPlay.imperial.suitableFor}</td>
        </tr>

        {/* Soft Play (Metric) */}
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Soft Play</td>
          <td className="px-6 py-4 border border-gray-300">Metric</td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300"></td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.softPlay.metric.suitableFor}</td>
        </tr>
      </tbody>
    </table>
  </div>
  )
}else if(s === 's50' || s ==='s51' || s === 's52' || s === 's53' || s==='s20' || s ==='s54' || s ==='s55' || s ==='s56' ) {
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
  )
}else if(s === 's60' || s ==='s61'){
  return (
    <div className="overflow-x-auto">
    <table className="min-w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-6 py-4 border border-gray-300">Measurement</th>
          <th className="px-6 py-4 border border-gray-300">Imperial</th>
          <th className="px-6 py-4 border border-gray-300">Metric</th>
        </tr>
      </thead>
      <tbody>
        {/* Size Row */}
        <tr className="bg-white">
          <td className="px-6 py-4 border border-gray-300">Size</td>
          <td className="px-6 py-4 border border-gray-300">{data.size[0].imperial}</td>
          <td className="px-6 py-4 border border-gray-300">{data.size[0].metric}</td>
        </tr>

        {/* Required Space Row */}
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Required Space</td>
          <td className="px-6 py-4 border border-gray-300">{data.requiredSpace[0].imperial}</td>
          <td className="px-6 py-4 border border-gray-300">{data.requiredSpace[0].metric}</td>
        </tr>
      </tbody>
    </table>
  </div>
  )
}else if(s === 's62' || s=== 's63' || s ==='s64' || s ==='s65' || s ==='s66' || s === 's67' || s === 's68' || s === 's69'){
  return (
    <div className="overflow-x-auto">
    <table className="min-w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-6 py-4 border border-gray-300">Size</th>
        </tr>
      </thead>
      <tbody>
        {size.map((item, index) => (
          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
            <td className="px-6 py-4 border border-gray-300">{item}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}else if(s === 's70'){
  return (
    <div className="overflow-x-auto">
    <table className="min-w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-6 py-4 border border-gray-300">Measurement</th>
          <th className="px-6 py-4 border border-gray-300">Imperial</th>
          <th className="px-6 py-4 border border-gray-300">Metric</th>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-white">
          <td className="px-6 py-4 border border-gray-300">Width</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.width}</td>
        </tr>
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Length</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.length}</td>
        </tr>
        <tr className="bg-white">
          <td className="px-6 py-4 border border-gray-300">Height</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.height}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.height}</td>
        </tr>
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Required Space Width</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.requiredSpace.width}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.requiredSpace.width}</td>
        </tr>
        <tr className="bg-white">
          <td className="px-6 py-4 border border-gray-300">Required Space Length</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.requiredSpace.length}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.requiredSpace.length}</td>
        </tr>
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Required Space Height</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.requiredSpace.height}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.requiredSpace.height}</td>
        </tr>
        <tr className="bg-white">
          <td className="px-6 py-4 border border-gray-300">Access Width</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.imperial.accessWidth}</td>
          <td className="px-6 py-4 border border-gray-300">{size.dimensions.bouncyCastle.metric.accessWidth}</td>
        </tr>
      </tbody>
    </table>
  </div>
  )
}else if(s ==='s71'){
  return (  <div className="overflow-x-auto">
    <table className="min-w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-6 py-4 border border-gray-300">Item</th>
          <th className="px-6 py-4 border border-gray-300">Measurement</th>
          <th className="px-6 py-4 border border-gray-300">Imperial</th>
          <th className="px-6 py-4 border border-gray-300">Metric</th>
        </tr>
      </thead>
      <tbody>
        {/* Juniors Slide */}
        <tr className="bg-white">
          <td className="px-6 py-4 border border-gray-300" rowSpan="4">Juniors Slide</td>
          <td className="px-6 py-4 border border-gray-300">Width</td>
          <td className="px-6 py-4 border border-gray-300">12ft</td>
          <td className="px-6 py-4 border border-gray-300">3.7m</td>
        </tr>
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Length</td>
          <td className="px-6 py-4 border border-gray-300">12ft</td>
          <td className="px-6 py-4 border border-gray-300">3.7m</td>
        </tr>
        <tr className="bg-white">
          <td className="px-6 py-4 border border-gray-300">Height</td>
          <td className="px-6 py-4 border border-gray-300">8ft</td>
          <td className="px-6 py-4 border border-gray-300">2.4m</td>
        </tr>
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Slide Platform Height</td>
          <td className="px-6 py-4 border border-gray-300">5ft</td>
          <td className="px-6 py-4 border border-gray-300">1.5m</td>
        </tr>

        {/* Toddlers Bouncy Castle */}
        <tr className="bg-white">
          <td className="px-6 py-4 border border-gray-300" rowSpan="6">Toddlers Bouncy Castle</td>
          <td className="px-6 py-4 border border-gray-300">Width</td>
          <td className="px-6 py-4 border border-gray-300">9ft</td>
          <td className="px-6 py-4 border border-gray-300">2.7m</td>
        </tr>
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Length</td>
          <td className="px-6 py-4 border border-gray-300">11.5ft</td>
          <td className="px-6 py-4 border border-gray-300">3.5m</td>
        </tr>
        <tr className="bg-white">
          <td className="px-6 py-4 border border-gray-300">Height</td>
          <td className="px-6 py-4 border border-gray-300">8ft</td>
          <td className="px-6 py-4 border border-gray-300">2.4m</td>
        </tr>
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Required Space Width</td>
          <td className="px-6 py-4 border border-gray-300">12ft</td>
          <td className="px-6 py-4 border border-gray-300">3.7m</td>
        </tr>
        <tr className="bg-white">
          <td className="px-6 py-4 border border-gray-300">Required Space Length</td>
          <td className="px-6 py-4 border border-gray-300">17ft</td>
          <td className="px-6 py-4 border border-gray-300">5.2m</td>
        </tr>
        <tr className="bg-gray-50">
          <td className="px-6 py-4 border border-gray-300">Required Space Height</td>
          <td className="px-6 py-4 border border-gray-300">8.5ft</td>
          <td className="px-6 py-4 border border-gray-300">2.6m</td>
        </tr>
        <tr className="bg-white">
          <td className="px-6 py-4 border border-gray-300">Access Width</td>
          <td className="px-6 py-4 border border-gray-300">3ft</td>
          <td className="px-6 py-4 border border-gray-300">0.9m</td>
        </tr>
      </tbody>
    </table>
  </div>)
}else if(s ==='s72' || s ==='s73' || s==='s74' || s ==='s75' || s === 's76' || s === 's77' || s === 's78' || s === 's79' || s ==='s80' || s === 's81' || s === 's82' || s==='s83' || s === 's84' || s === 's85' ||s ==='s86' || s==='s87' || s === 's88' || s==='s89' || s ==='s90' || s ==='s91' || s ==='s92' || s ==='s93' || s ==='s94' || s ==='s95' || s==='s96' || s==='s97' || s==='s98' || s==='s99'){
return (
 <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-6 py-4 border border-gray-300">Measurement</th>
            <th className="px-6 py-4 border border-gray-300">Imperial</th>
            <th className="px-6 py-4 border border-gray-300">Metric</th>
          </tr>
        </thead>
        <tbody>
          {/* Dimensions */}
          <tr className="bg-white">
            <td className="px-6 py-4 border border-gray-300">Width</td>
            <td className="px-6 py-4 border border-gray-300">15ft</td>
            <td className="px-6 py-4 border border-gray-300">4.6m</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="px-6 py-4 border border-gray-300">Length</td>
            <td className="px-6 py-4 border border-gray-300">12ft</td>
            <td className="px-6 py-4 border border-gray-300">3.7m</td>
          </tr>
          <tr className="bg-white">
            <td className="px-6 py-4 border border-gray-300">Height</td>
            <td className="px-6 py-4 border border-gray-300">9.5ft</td>
            <td className="px-6 py-4 border border-gray-300">2.9m</td>
          </tr>

          {/* Required Space */}
          <tr className="bg-gray-200 font-bold">
            <td className="px-6 py-4 border border-gray-300" colSpan="3">Required Space</td>
          </tr>
          <tr className="bg-white">
            <td className="px-6 py-4 border border-gray-300">Width</td>
            <td className="px-6 py-4 border border-gray-300">21ft</td>
            <td className="px-6 py-4 border border-gray-300">6.4m</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="px-6 py-4 border border-gray-300">Length</td>
            <td className="px-6 py-4 border border-gray-300">15ft</td>
            <td className="px-6 py-4 border border-gray-300">4.6m</td>
          </tr>
          <tr className="bg-white">
            <td className="px-6 py-4 border border-gray-300">Height</td>
            <td className="px-6 py-4 border border-gray-300">10ft</td>
            <td className="px-6 py-4 border border-gray-300">3.0m</td>
          </tr>
        </tbody>
      </table>
    </div>
)}
};
