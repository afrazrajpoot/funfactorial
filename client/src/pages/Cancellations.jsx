import React from "react";
import Ribbons from "../components/Ribbons";

const Cancellations = () => {
  const cancellationData = [
    {
      title: "Why do we charge for cancellations:",
      info: "Unfortunately, we have to charge for cancellations as we have held your booking and prevented any other customer booking this item. Most our bookings come in at least 1 month in advance and that is why we have a sliding scale of cancellation based on the likelihood we will be able to hire these items to someone else. As a business every hire counts to be able to make a profit at the end of the year. Some of our costs include administration, staff commitments, vehicle and generator hire which must be paid for regardless of whether your event goes ahead or not.",
    },
    {
      title: "Date change:",
      lists: [
        "If you as the customer would like to make a cancellation more than 14 days before your hire then you may transfer any payments made to an alternative date within 6 months of the original hire date. There will be a £45 administration fee for this.",
        "For cancellations within 14 days of your hire then you may transfer any payments made to an alternative date within 6 months of the original hire date. There will be a £45 administration fee plus 35% of the hire price for this.",
        "For cancellations within 7 days of the hire date then you may transfer any payments made to an alternative date within 6 months of the original hire date. There will be a £45 administration fee plus 50% of the hire price for this.",
      ],
    },
    {
      title: "Date change:",
      lists: [
        "For cancellations more than 14 days before your hire date may be refunded in full. There will be a £45 administration fee for this.",
        "For cancellations within 14 days will be subject to 50% of the hire price plus a £45 administration fee.",
        "For cancellations within 7 days will be subject to 75% of the hire price plus £45 administration fee.",
        "For cancellations within 3 days before the hire date will be subject to 100% booking value plus £45 administration fee.",
      ],
    },
    {
      title: "Refunds:",
      info: "For cancellations more than 14 days before your hire date may be refunded in full. There will be a £45 administration fee for this. For cancellations within 14 days will be subject to 50% of the hire price plus a £45 administration fee. For cancellations within 7 days will be subject to 75% of the hire price plus £45 administration fee. For cancellations within 3 days before the hire date will be subject to 100% booking value plus £45 administration fee.",
    },
    {
      title: "Refusal of Delivery:",
      info: "If you cancel your booking after our team has arrived at your venue, you will be charged a 100% cancellation fee. In rare circumstances where we are unable to complete our delivery for reasons which include: the set up area is not safe, area not adequate in size or inaccessible, surface type not permitted, the area is unsanitary, power was not supplied within 45m or any abuse given to our staff. There will be 100% charge for the delivery plus £45 administration fee.",
    },
    {
      title: "Wet / Adverse Weather:",
      info: "With regards to bad weather we will be in contact with you to make alternative arrangements. Cancellations due to adverse weather can only be made by funrides staff. We can not hire with wind gust speeds exceeding 24mph and heavy rain or snow. Light showers and all types of sunshine including heatwaves are fine for our equipment and will not effect their use. We will not charge any additional fees for bad weather cancellations but we will also not issue any refunds. You must select a new date within 6 months.",
    },
  ];

  return (
    <main className="flex items-start gap-[5vw] pb-[5vw] w-full">
      <section className="mt-[1vw] hidden lg:block">
        <Ribbons />
      </section>
      <section className="mt-[1vw] w-full">
        <h1 className="text-[#ed145b] mt-[4vw] text-center text-[7vw] lg:text-left lg:text-[2.3vw] font-medium font-ab">
          Cancellation and adverse / weather policy
        </h1>
        <article className="flex flex-col gap-[1vw] mt-[1vw]">
          {cancellationData.map((cancellation, ind) => (
            <div className="flex" key={ind}>
              <p className="lg:text-[1.2vw] p-[3vw] lg:p-[0vw] font-pt w-full lg:max-w-[65vw]">
                <br />
                <p className="font-bold lg:text-[1.5vw] font-pt">{cancellation.title}</p>
                {cancellation.info && <p className="lg:text-[1.2vw]">{cancellation.info}</p>}
                {cancellation.lists && (
                  <ul className="list-disc ml-5">
                    {cancellation.lists.map((listItem, idx) => (
                      <li key={idx} className="lg:text-[1.2vw] p-[0.5vw]">
                        {listItem}
                      </li>
                    ))}
                  </ul>
                )}
              </p>
            </div>
          ))}
          <p>
            Our delivery driver's decision is final. They have the rights to make any cancellations
            and their decision can not be overturned.
          </p>
        </article>
      </section>
    </main>
  );
};

export default Cancellations;
